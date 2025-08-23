import DailyAirportStatusReportForm from "@/components/admin/hrd/DailyAirportStatus";
import LeaveOfAbsenceForm from "@/components/admin/hrd/LeaveOfAbs";
import AbsenteeReportForm from "@/components/admin/hrd/Abscent";
import ShiftExchangeForm from "@/components/admin/hrd/Exchange";
import ParkingAccessApplicationForm from "@/components/admin/hrd/Parking";
import TimeSheetForm from "@/components/admin/hrd/TimeSheet";
import RosterForm from "@/components/admin/hrd/Roster";

export default function FormsDemoPage() {
  return (
    <div className="grid gap-8">
      <AbsenteeReportForm />
    </div>
  );
}
