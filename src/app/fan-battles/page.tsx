import { ChallengeCardComponent } from "@/components/challenge-card"
import { NavbarComponent } from "@/components/Navbar"
import { PowerSquatCardComponent, PowerSquatCardComponentHorizontal } from "@/components/power-squat-card"
import { EXERCISE_CONFIG } from "@/constant/appConfig"

const FanBattlePage = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="container  max-w-6xl mx-auto py-10">
        <h1>Training that will make you sweat.</h1>
        <div className="flex justify-between space-x-10  pt-10">
          <div className=" flex flex-col space-y-10">
            <ChallengeCardComponent />
          </div>
          <div className="w-[40%] flex space-y-5 flex-col ">
            {EXERCISE_CONFIG.map((card, index) => <PowerSquatCardComponentHorizontal {...card} key={index} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FanBattlePage