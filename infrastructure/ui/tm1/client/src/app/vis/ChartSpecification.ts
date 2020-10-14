type ChartType = "bar" | "line"
interface DataView {
  id: string
  vis: ChartType
  title: string
}