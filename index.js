const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const {notFound, errorHandler} = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

//////////////////////////////////////// ACADEMICS ROUTES START HERE /////////////////////////////////////////

const ClassesRouter = require("./routes/Academics/ClassesRoute");
const SectionRouter = require("./routes/Academics/SectionRoute");
const SubjectRouter = require("./routes/Academics/SubjectRoute");
const SubjectGroupRouter = require("./routes/Academics/SubjectGroupRoute");

//////////////////////////////////////// ACADEMICS ROUTES END'S HERE /////////////////////////////////////////

//////////////////////////////////////// ALUMNI ROUTES START HERE ////////////////////////////////////////////

const AlumniRouter = require("./routes/Alumni/AlumniRoute");

//////////////////////////////////////// ALUMNI ROUTES END'S HERE ////////////////////////////////////////////

//////////////////////////////////////// FRONT OFFICE ROUTES START HERE //////////////////////////////////////

const EnquiryRouter = require("./routes/FrontOffice/EnquiryRoute");
const VisitorsBookRouter = require("./routes/FrontOffice/VisitorsBookRoute");
const PhoneCallRouter = require("./routes/FrontOffice/PhoneCallRoute");
const PostalDispatchRouter = require("./routes/FrontOffice/PostalDispatchRoute");
const PostalReciveRouter = require("./routes/FrontOffice/PostalReciveRoute");
const ComplainRouter = require("./routes/FrontOffice/ComplainRoute");
const PurposeRouter = require("./routes/FrontOffice/PurposeRoute");
const ComplaintRouter = require("./routes/FrontOffice/ComplainttypeRoute");
const SourceRouter = require("./routes/FrontOffice/SourceRoute");
const ReferenceRouter = require("./routes/FrontOffice/ReferenceRoute");

//////////////////////////////////////// FRONT OFFICE ROUTES END'S HERE //////////////////////////////////////

//////////////////////////////////////// HOSTELS ROUTES START HERE ///////////////////////////////////////////

const HostelRoomsRouter = require("./routes/Hostel/HostelRoomsRoute");
const HostelsRouter = require("./routes/Hostel/HostelsRoute");
const RoomTypesRouter = require("./routes/Hostel/RoomTypesRoute");

//////////////////////////////////////// HOSTELS ROUTES END'S HERE ///////////////////////////////////////////

//////////////////////////////////////// HUMAN RESOURCE ROUTES START HERE ////////////////////////////////////

const StaffRouter = require("./routes/HumanResource/StaffRoute");
const DepartmentRouter = require("./routes/HumanResource/DepartmentRoute");
const DesignationRouter = require("./routes/HumanResource/DesignationRoute");
const LeaveTypeRouter = require("./routes/HumanResource/LeaveTypeRoute");
const ApplyLeaveRouter = require("./routes/HumanResource/ApplyLeaveRoute");

//////////////////////////////////////// HUMAN RESOURCE ROUTES END'S HERE ////////////////////////////////////

//////////////////////////////////////// SETTINGS ROUTES START HERE //////////////////////////////////////////

const CurrencyRouter = require("./routes/Settings/CurrencyRoute");
const RolesRouter = require("./routes/Settings/RolesRoute");
const LanguageRouter = require("./routes/Settings/LanguageRoute");
const SessionsRouter = require("./routes/Settings/SessionRoute");

//////////////////////////////////////// SETTINGS ROUTES END'S HERE //////////////////////////////////////////

//////////////////////////////////////// STUDENT INFORMATION ROUTES START HERE ///////////////////////////////

const DisableReasonRouter = require("./routes/StudentInformation/DisableReasonRoute");
const SchoolHouseRouter = require("./routes/StudentInformation/SchoolHouseRoute");
const StudentCategoryRouter = require("./routes/StudentInformation/StudentCategoryRoute");
const StudentAdmissionRouter = require("./routes/StudentInformation/StudentAdmissionRoute");

//////////////////////////////////////// STUDENT INFORMATION ROUTES END'S HERE ///////////////////////////////

//////////////////////////////////////// TRANSPORT ROUTES START HERE /////////////////////////////////////////

const PickupPointRouter = require("./routes/Transport/PickupPointRoute");
const RouteRouter = require("./routes/Transport/RouteRoute");
const VehicleRouter = require("./routes/Transport/VehicleRoute");
const AssignVehicleRouter = require("./routes/Transport/AssignVehicleRoute");
const RoutePickupPointRouter = require("./routes/Transport/RoutePickupPointRoute");

//////////////////////////////////////// TRANSPORT ROUTES END'S HERE /////////////////////////////////////////

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

////////////////////////////////////////// ACADEMICS ROUTES START HERE //////////////////////////////////////

app.use("/api/class", ClassesRouter);
app.use("/api/section", SectionRouter);
app.use("/api/subject", SubjectRouter);
app.use("/api/subjectgroup", SubjectGroupRouter);

////////////////////////////////////////// ACADEMICS ROUTES END'S HERE //////////////////////////////////////

////////////////////////////////////////// ALUMNI ROUTES START HERE /////////////////////////////////////////

app.use("/api/class", AlumniRouter);

////////////////////////////////////////// ALUMNI ROUTES START HERE ////////////////////////////////////////

////////////////////////////////////////// FRONT OFFICE ROUTES START HERE ///////////////////////////////////

app.use("/api/enquiry", EnquiryRouter);
app.use("/api/visitor", VisitorsBookRouter);
app.use("/api/generalcall", PhoneCallRouter);
app.use("/api/dispatch", PostalDispatchRouter);
app.use("/api/recive", PostalReciveRouter);
app.use("/api/complain", ComplainRouter);
app.use("/api/purpose", PurposeRouter);
app.use("/api/complainttype", ComplaintRouter);
app.use("/api/source", SourceRouter);
app.use("/api/reference", ReferenceRouter);

////////////////////////////////////////// FRONT OFFICE ROUTES END'S HERE ///////////////////////////////////

////////////////////////////////////////// HOSTELS ROUTES START HERE ////////////////////////////////////////

app.use("/api/hostelroom", HostelRoomsRouter);
app.use("/api/hostel", HostelsRouter);
app.use("/api/roomtype", RoomTypesRouter);

////////////////////////////////////////// HOSTELS ROUTES END'S HERE ////////////////////////////////////////

////////////////////////////////////////// HUMAN RESOURCE ROUTES START HERE /////////////////////////////////

app.use("/api/staff", StaffRouter);
app.use("/api/department", DepartmentRouter);
app.use("/api/designation", DesignationRouter);
app.use("/api/leave_type", LeaveTypeRouter);
app.use("/api/apply_leave", ApplyLeaveRouter);

////////////////////////////////////////// HUMAN RESOURCE ROUTES END'S HERE /////////////////////////////////

////////////////////////////////////////// SETTINGS ROUTES START HERE ///////////////////////////////////////

app.use("/api/currency", CurrencyRouter);
app.use("/api/language", LanguageRouter);
app.use("/api/role", RolesRouter);
app.use("/api/session", SessionsRouter);

////////////////////////////////////////// SETTINGS ROUTES END'S HERE ///////////////////////////////////////

////////////////////////////////////////// STUDENT INFORMATION ROUTES START HERE ////////////////////////////

app.use("/api/disablereason", DisableReasonRouter);
app.use("/api/schoolhouse", SchoolHouseRouter);
app.use("/api/category", StudentCategoryRouter);
app.use("/api/student", StudentAdmissionRouter);

////////////////////////////////////////// STUDENT INFORMATION ROUTES END'S HERE ////////////////////////////

////////////////////////////////////////// TRANSPORT ROUTES START HERE //////////////////////////////////////

app.use("/api/pickup_point", PickupPointRouter);
app.use("/api/route", RouteRouter);
app.use("/api/vehicle", VehicleRouter);
app.use("/api/assign", AssignVehicleRouter);
app.use("/api/route_pikup", RoutePickupPointRouter);

///////////////////////////////////////// TRANSPORT ROUTES END'S HERE ///////////////////////////////////////

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  at PORT http://localhost:${PORT}`);
});
