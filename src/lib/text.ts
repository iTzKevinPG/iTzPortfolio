const escape = (s: string): string =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Convierte `**texto**` en <em class="hl">. Escapa el resto: el contenido nunca inyecta HTML. */
export function rich(text: string): string {
	return escape(text).replace(/\*\*(.+?)\*\*/g, '<em class="hl">$1</em>');
}

/** Texto plano sin marcas (para alt, meta description, etc.). */
export function plain(text: string): string {
	return text.replace(/\*\*(.+?)\*\*/g, '$1');
}

/**
 * Parte el texto en palabras (<span class="w">) para el efecto "texto que se enciende".
 * Las palabras resaltadas llevan además `hl`. Los espacios quedan fuera de los spans.
 */
export function words(text: string): string {
	return text
		.split(/(\*\*.+?\*\*)/g)
		.filter(Boolean)
		.map((part) => {
			const hl = part.startsWith('**');
			const clean = hl ? part.slice(2, -2) : part;
			return clean.replace(/\S+/g, (w) => `<span class="w${hl ? ' hl' : ''}">${escape(w)}</span>`);
		})
		.join('');
}
