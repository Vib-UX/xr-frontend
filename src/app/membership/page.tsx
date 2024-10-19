import { GogginsCard } from "@/components/goggins-card"
import { NavbarComponent } from "@/components/Navbar"
import { Card, CardContent } from "@/components/ui/card"

const FanBattlePage = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="container max-w-6xl mx-auto py-10">
        <div className="flex justify-between space-x-10 pt-10">
          <div className="w-full  flex flex-col">
            <GogginsCard />
          </div>
          <div className="w-[30%] flex flex-col space-y-5">
            <Card className="overflow-hidden">
              <img
                src={"/images/transform.png"}
                alt="Expert-Led Programs"
                className="w-full h-32 object-cover"
              />
              <CardContent className="p-2 bg-gray-100 h-full">
                <p className="text-sm font-semibold text-center">Expert-Led Programs</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <img
                src={"/images/transform.png"}
                alt="Expert-Led Programs"
                className="w-full h-32 object-cover"
              />
              <CardContent className="p-2 bg-gray-100 h-full">
                <p className="text-sm font-semibold text-center">Expert-Led Programs</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <img
                src={"/images/transform.png"}
                alt="Expert-Led Programs"
                className="w-full h-32 object-cover"
              />
              <CardContent className="p-2 bg-gray-100 h-full">
                <p className="text-sm font-semibold text-center">Expert-Led Programs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FanBattlePage