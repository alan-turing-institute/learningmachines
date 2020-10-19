export type ChartType = "bar" | "line"
export type SizeClass = "fixedSize" | "autoSize"

export interface DataView {
  id: string
  sizeClass: SizeClass
  vis: ChartType
  title: string
  data: Array<{x:string, y:number}>
}