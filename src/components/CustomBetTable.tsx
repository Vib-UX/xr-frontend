import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export default function CustomBetTable() {
  const bettingData = [
    { match: "UFC 306: O Malley vs. Dvalishvili", user: "Hidden", time: "12:08PM", betAmount: 0.62402202, multiplier: 1.62, payout: 1.00920004 },
    { match: "UFC 306: O Malley vs. Dvalishvili", user: "Hidden", time: "12:08PM", betAmount: 0.62402202, multiplier: 1.62, payout: -1.00920004 },
    { match: "UFC 306: O Malley vs. Dvalishvili", user: "Hidden", time: "12:08PM", betAmount: 0.62402202, multiplier: 1.62, payout: 1.00920004 },
    { match: "UFC 306: O Malley vs. Dvalishvili", user: "Hidden", time: "12:08PM", betAmount: 0.62402202, multiplier: 1.62, payout: 1.00920004 },
    { match: "UFC 306: O Malley vs. Dvalishvili", user: "Hidden", time: "12:08PM", betAmount: 0.62402202, multiplier: 1.62, payout: 1.00920004 },
    { match: "UFC 306: O Malley vs. Dvalishvili", user: "Hidden", time: "12:08PM", betAmount: 0.62402202, multiplier: 1.62, payout: 1.00920004 },
  ]

  return (
    <div className="w-full  py-4 pt-10 rounded-xl">
      <Table>
        <TableHeader>
          <TableRow className="bg-white ">
            <TableHead className="font-semibold py-3">Match</TableHead>
            <TableHead className="font-semibold py-3">User</TableHead>
            <TableHead className="font-semibold py-3">Time</TableHead>
            <TableHead className="font-semibold py-3">Bet Amount</TableHead>
            <TableHead className="font-semibold py-3">Multiplier</TableHead>
            <TableHead className="font-semibold py-3">Payout</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bettingData.map((bet, index) => (
            <TableRow key={index} className={cn(index % 2 === 0 ? "bg-white" : "bg-blue-50", "")}>
              <TableCell className="py-3">{bet.match}</TableCell>
              <TableCell className="py-3">{bet.user}</TableCell>
              <TableCell className="py-3">{bet.time}</TableCell>
              <TableCell className="text-blue-600 py-3">{bet.betAmount.toFixed(8)}</TableCell>
              <TableCell className="text-blue-600 py-3">{bet.multiplier.toFixed(2)} ×</TableCell>
              <TableCell className={cn(bet.payout >= 0 ? "text-green-600" : "text-red-600", "py-3")}>
                {bet.payout.toFixed(8)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}