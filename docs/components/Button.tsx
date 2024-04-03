export function Button(props: React.HTMLProps<HTMLButtonElement>) {
  const { type: _, ...rest } = props
  const style = props.style || {}
  return <button {...rest} className="vocs_Button_button vocs_Link vocs_Link_styleless" style={{ userSelect: 'none', ...style }} />
}
