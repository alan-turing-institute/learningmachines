export type ChartType = "bar" | "line"
export type SizeClass = "fixedSize" | "autoSize"

interface AxisData {
  x:string,
  y:number
}
export interface DataView {
  id: string
  sizeClass: SizeClass
  vis: ChartType
  title: string
  data: Array<AxisData>
}