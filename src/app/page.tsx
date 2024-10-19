import { ChallengeTabsComponent } from "@/components/challenge-tabs"
import CustomBetTable from "@/components/CustomBetTable"
import { NavbarComponent } from "@/components/Navbar"
import { PowerSquatCardComponent } from "@/components/power-squat-card"
import { EXERCISE_CONFIG } from "@/constant/appConfig"

const HomePage = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="container mx-auto py-10">
        <h1>Fitness Bets</h1>
        <div className="flex flex-row gap-4 py-10">
          {EXERCISE_CONFIG.map((card, index) => <PowerSquatCardComponent {...card} key={index} />)}
        </div>
        <ChallengeTabsComponent />
        <CustomBetTable />
      </div>
    </div>
  )
}

export default HomePage