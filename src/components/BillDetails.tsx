import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Skeleton,
  Chip,
  Tooltip,
  Fade,
  Avatar,
  Card,
  CardContent,
  alpha,
} from "@mui/material";
import React from "react";
import {
  CurrencyRupee,
  PeopleOutline,
  ReceiptLongTwoTone,
  TrendingUp,
  CalendarMonth,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Mock data for the bill details
const mockData = {
  data: {
    blockNumber: "B",
    flatNumber: "1802",
    noOfInvoices: 2,
    totalSalesValue: 1000,
  },
};

// Mock data for the bill table
const mockBillData = [
  {
    id: "URM02065",
    billDate: 1735714616,
    billValue: 360.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
    videoId: 1001,
  },
  {
    id: "URM02630",
    billDate: 1736319223,
    billValue: 531.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
    videoId: 1002,
  },
  {
    id: "URM04526",
    billDate: 1738327843,
    billValue: 473.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
    videoId: 1003,
  },
  {
    id: "URM02549",
    billDate: 1736235927,
    billValue: 299.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
    videoId: 1004,
  },
  {
    id: "URM04273",
    billDate: 1738073130,
    billValue: 620.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
  },
  {
    id: "URM01723",
    billDate: 1735279688,
    billValue: 1216.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
  },
  {
    id: "URM02293",
    billDate: 1735921655,
    billValue: 195.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
  },
  {
    id: "URM03508",
    billDate: 1737295876,
    billValue: 769.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
  },
  {
    id: "URM04038",
    billDate: 1737876268,
    billValue: 899.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
  },
  {
    id: "URM01430",
    billDate: 1734880303,
    billValue: 321.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
  },
  {
    id: "URM03472",
    billDate: 1737273564,
    billValue: 155.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
  },
  {
    id: "URM04655",
    billDate: 1738482911,
    billValue: 460.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
  },
  {
    id: "URM02595",
    billDate: 1736260620,
    billValue: 313.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
  },
  {
    id: "URM03586",
    billDate: 1737381086,
    billValue: 728.0,
    customerName: "Dr. Jayakrishnan",
    status: "Paid",
  },
  {
    id: "URM09221",
    billDate: 1742908996,
    billValue: 175.0,
    customerName: "Dr. Sirisha",
    status: "Paid",
  },
  {
    id: "URM01572",
    billDate: 1735052345,
    billValue: 284.0,
    customerName: "Dr. Sirisha",
    status: "Paid",
  },
  {
    id: "URM02321",
    billDate: 1745853004,
    billValue: 127.0,
    customerName: "Dr. Sirisha",
    status: "Paid",
  },
];

const mockDataWithCutomers = {
  bills: mockBillData,
  totalCustomers: "2",
};

export const formatEpochToReadable = (epoch: number): string => {
  const isInSeconds = epoch.toString().length === 10;
  const date = new Date(isInSeconds ? epoch * 1000 : epoch);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // Jan, Feb, etc.
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  return `${day}-${month}-${year}, ${hours}:${minutes}${ampm}`;
};

// Enhanced StatCard component with animation and improved styling
const EnhancedStatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
  label: string;
  mainColor: string;
  lightColor: string;
}> = ({ icon, title, value, label, mainColor, lightColor }) => {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        borderRadius: "16px",
        background: `linear-gradient(145deg, #ffffff 0%, ${alpha(
          lightColor,
          0.4
        )} 100%)`,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        },
        overflow: "visible",
        border: `1px solid ${alpha(mainColor, 0.2)}`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: "text.secondary",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </Typography>
          <Avatar
            sx={{
              bgcolor: lightColor,
              color: mainColor,
              width: 46,
              height: 46,
              boxShadow: `0 4px 12px ${alpha(mainColor, 0.3)}`,
              "& .MuiSvgIcon-root": {
                fontSize: "1.75rem",
              },
            }}
          >
            {icon}
          </Avatar>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: mainColor,
            lineHeight: 1.2,
            mb: 0.5,
          }}
        >
          {typeof value === "number"
            ? value.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              })
            : value}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {label}
          </Typography>
          {label.includes("%") && (
            <TrendingUp fontSize="small" sx={{ color: mainColor }} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

// Status chip component
const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  let color;
  let bgColor;

  switch (status) {
    case "Paid":
      color = "#0B875B";
      bgColor = "#E6F4F1";
      break;
    case "Pending":
      color = "#E94C2B";
      bgColor = "#FEEFEB";
      break;
    case "Processing":
      color = "#F6C000";
      bgColor = "#FEF9E7";
      break;
    default:
      color = "#718096";
      bgColor = "#F7FAFC";
  }

  return (
    <Chip
      label={status}
      sx={{
        backgroundColor: bgColor,
        color: color,
        fontWeight: 600,
        fontSize: "0.75rem",
        height: "24px",
        px: 0.5,
        border: `1px solid ${alpha(color, 0.2)}`,
      }}
      size="small"
    />
  );
};

const BillDetails = () => {
  // State to track loading status
  const [loading, setLoading] = React.useState(true);
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);
  const navigate = useNavigate();

  // Simulate loading data
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle the "View Details" button click
  const handleViewDetails = (bill: any) => {
    // Add your navigation logic here
    navigate(`/video-details?id=${bill.videoId}`, {
      state: { videoId: bill.videoId },
    });
  };

  // Calculate totals for summary
  const totalBillValue = mockBillData.reduce(
    (acc, bill) => acc + bill.billValue,
    0
  );
  const totalBills = mockBillData.length;
  const paidBills = mockBillData.filter(
    (bill) => bill.status === "Paid"
  ).length;

  return (
    <Box sx={{ p: 3, bgcolor: "#F8FAFC" }}>
      {/* Page Header */}

      {/* <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1E293B",
            mb: 1,
            fontSize: {
              xs: "1.5rem",
              md: "2rem",
            },
          }}
        >
          Billing Dashboard
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#64748B",
            maxWidth: "700px",
            lineHeight: 1.6,
          }}
        >
          Track and manage your billing information with our comprehensive
          dashboard. View all transactions and payment statuses at a glance.
        </Typography> */}

      {/* Stats Cards */}
      <Grid
        container
        spacing={2}
        sx={{
          mb: 4,
        }}
      >
        <Grid sx={{ minWidth: "22%" }}>
          <EnhancedStatCard
            icon={<PeopleOutline />}
            title="Flat Details"
            value={mockData.data.flatNumber}
            label={`${mockData.data.blockNumber}-Block`}
            mainColor="#8B5CF6"
            lightColor="#F3EAFF"
          />
        </Grid>
        <Grid sx={{ minWidth: "22%" }}>
          <EnhancedStatCard
            icon={<CurrencyRupee />}
            title="Sales Generated"
            value={totalBillValue}
            label={`${paidBills}/${totalBills} Invoices Paid`}
            mainColor="#0EA5E9"
            lightColor="#E0F7FF"
          />
        </Grid>
        <Grid sx={{ minWidth: "22%" }}>
          <EnhancedStatCard
            icon={<PeopleOutline />}
            title="Number of Customers"
            value={mockDataWithCutomers.totalCustomers}
            label={`Regigstered Customers`}
            mainColor="#EC4899"
            lightColor="#FCE7F3"
          />
        </Grid>
        <Grid sx={{ minWidth: "22%" }}>
          <EnhancedStatCard
            icon={<ReceiptLongTwoTone />}
            title="Invoice Growth"
            value="12%"
            label="vs. last month"
            mainColor="#16A34A"
            lightColor="#DCFCE7"
          />
        </Grid>
      </Grid>

      {/* Bills Table */}
      <Card
        elevation={3}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          },
          border: "1px solid rgba(226, 232, 240, 0.8)",
        }}
      >
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1E293B",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ReceiptLongTwoTone sx={{ color: "#0EA5E9" }} />
            Bill Details
          </Typography>

          {/* <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Chip
              label={`Total: ₹${totalBillValue.toLocaleString()}`}
              sx={{
                backgroundColor: alpha("#0EA5E9", 0.1),
                color: "#0EA5E9",
                fontWeight: 600,
                border: "1px solid",
                borderColor: alpha("#0EA5E9", 0.2),
              }}
            />
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)",
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                px: 3,
                boxShadow: "0 4px 6px rgba(14, 165, 233, 0.2)",
                "&:hover": {
                  boxShadow: "0 6px 10px rgba(14, 165, 233, 0.3)",
                  background:
                    "linear-gradient(135deg, #0993D3 0%, #035C8F 100%)",
                },
              }}
            >
              New Bill
            </Button>
          </Box> */}
        </Box>

        <TableContainer sx={{ maxHeight: 560 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#F1F5F9",
                    color: "#334155",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    fontSize: "0.875rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #E2E8F0",
                  }}
                >
                  Bill ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#F1F5F9",
                    color: "#334155",
                    fontSize: "0.875rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #E2E8F0",
                  }}
                >
                  Customer
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#F1F5F9",
                    color: "#334155",
                    fontSize: "0.875rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #E2E8F0",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#F1F5F9",
                    color: "#334155",
                    fontSize: "0.875rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #E2E8F0",
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#F1F5F9",
                    color: "#334155",
                    fontSize: "0.875rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #E2E8F0",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#F1F5F9",
                    color: "#334155",
                    fontSize: "0.875rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #E2E8F0",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? // Skeleton loading state
                  Array.from(new Array(5)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton animation="wave" height={30} />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Skeleton
                            animation="wave"
                            variant="circular"
                            width={36}
                            height={36}
                          />
                          <Skeleton animation="wave" width={120} height={30} />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" width={100} height={30} />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" width={80} height={30} />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" width={80} height={30} />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" width={100} height={36} />
                      </TableCell>
                    </TableRow>
                  ))
                : // Actual data
                  mockBillData.map((bill) => (
                    <TableRow
                      key={bill.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        backgroundColor:
                          hoveredRow === bill.id
                            ? alpha("#0EA5E9", 0.04)
                            : "transparent",
                        transition: "background-color 0.2s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => setHoveredRow(bill.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onClick={() => handleViewDetails(bill)}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontWeight: 600,
                          color: "#334155",
                          fontSize: "0.9rem",
                          py: 2,
                        }}
                      >
                        {bill.id}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: alpha("#0EA5E9", 0.1),
                              color: "#0EA5E9",
                              width: 36,
                              height: 36,
                              fontWeight: 600,
                              fontSize: "1rem",
                            }}
                          >
                            {bill.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                          <Typography
                            sx={{ fontWeight: 500, color: "#1E293B" }}
                          >
                            {bill.customerName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CalendarMonth
                            fontSize="small"
                            sx={{ color: "#64748B" }}
                          />
                          <Typography sx={{ color: "#64748B" }}>
                            {formatEpochToReadable(bill.billDate)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: "#334155",
                            fontSize: "0.9rem",
                          }}
                        >
                          ₹{bill.billValue.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <StatusChip status={bill.status} />
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title="View Complete Details"
                          placement="top"
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                          arrow
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<VisibilityOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(bill);
                            }}
                            sx={{
                              borderColor: "#CBD5E1",
                              color: "#334155",
                              textTransform: "none",
                              fontWeight: 500,
                              "&:hover": {
                                bgcolor: alpha("#0EA5E9", 0.08),
                                borderColor: "#0EA5E9",
                                color: "#0EA5E9",
                              },
                              boxShadow: "none",
                            }}
                          >
                            View
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            borderTop: "1px solid rgba(226, 232, 240, 0.8)",
            bgcolor: "#F8FAFC",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#64748B" }}>
            Showing {mockBillData.length} of {mockBillData.length} bills
          </Typography>
          {/* <Button
            variant="text"
            sx={{
              color: "#0EA5E9",
              fontWeight: 600,
              "&:hover": {
                bgcolor: alpha("#0EA5E9", 0.08),
              },
            }}
          >
            View All Bills
          </Button> */}
        </Box>
      </Card>
    </Box>
  );
};

export default BillDetails;
