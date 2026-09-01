interface Props { title: string; description: string; }
export function PlaceholderPage({ title, description }: Props) { return <section className="panel empty-state"><div className="empty-icon">KS</div><h2>{title}</h2><p>{description}</p><span>Módulo preparado para la siguiente etapa de implementación.</span></section>; }
