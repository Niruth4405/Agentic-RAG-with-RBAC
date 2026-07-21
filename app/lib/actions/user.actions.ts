'use server'

import { prisma } from '@/app/lib/prisma'
import { requireAdmin } from '@/app/lib/admin-guard'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().optional(),
  roleName: z.enum(['admin', 'hr', 'finance', 'engineering'], {
    errorMap: () => ({ message: 'Please select a role' }),
  }),
})

export type CreateUserState = {
  error?: string
  fieldErrors?: Record<string, string[]>
  success?: boolean
}

export async function createUserAction(
  _prevState: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
  const { error } = await requireAdmin()
  if (error) return { error: 'Unauthorized' }

  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
    fullName: formData.get('fullName') || undefined,
    roleName: formData.get('roleName'),
  }

  const parsed = createUserSchema.safeParse(raw)
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } })
  if (existing) return { error: 'A user with this email already exists.' }

  const role = await prisma.role.findUnique({ where: { name: parsed.data.roleName } })
  if (!role) return { error: 'Selected role not found.' }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12)

  await prisma.user.create({
    data: {
      email: parsed.data.email,
      passwordHash,
      fullName: parsed.data.fullName,
      roleId: role.id,
    },
  })

  revalidatePath('/admin/users') // bust the Server Component cache
  return { success: true }
}