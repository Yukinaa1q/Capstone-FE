import { RenderElementProps } from "slate-react"

const ParagraphElement = ({attributes, children }: RenderElementProps) => {
  return (
    <p {...attributes}>{children}</p>
  )
}



export default function buildElement(props : RenderElementProps) {
  switch(props.element.type) {
    case "p":
      return <ParagraphElement {...props}/>
    default:
      return <ParagraphElement {...props}/>
  }
} 