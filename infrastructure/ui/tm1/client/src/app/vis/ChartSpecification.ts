export type ChartType = "bar" | "line"
export interface DataView {
  id: string
  vis: ChartType
  title: string
  data: Array<{x:string, y:number}>
}