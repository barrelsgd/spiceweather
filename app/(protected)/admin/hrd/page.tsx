import DailyAirportStatusReportForm from "@/components/hrd/DailyAirportStatus";
import LeaveOfAbsenceForm from "@/components/hrd/LeaveOfAbs";
import AbsenteeReportForm from "@/components/hrd/Abscent";
import ShiftExchangeForm from "@/components/hrd/Exchange";
import ParkingAccessApplicationForm from "@/components/hrd/Parking";
import TimeSheetForm from "@/components/hrd/TimeSheet";
import RosterForm from "@/components/hrd/Roster";

export default function FormsDemoPage() {
  return (
    <main className="container mx-auto grid gap-8 py-8">
      <DailyAirportStatusReportForm />
      <LeaveOfAbsenceForm />
      <AbsenteeReportForm />
      <ShiftExchangeForm />
      <ParkingAccessApplicationForm />
      <TimeSheetForm />
      <RosterForm />
    </main>
  );
}
