export default function ThemeScript() {
  const script = `(function(){
  try {
    var t = localStorage.getItem('rag-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})()`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}