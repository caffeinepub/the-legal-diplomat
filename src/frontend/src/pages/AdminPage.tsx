import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogIn, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetAllLeads, useIsAdmin } from "../hooks/useQueries";

export default function AdminPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const { data: leads, isLoading: leadsLoading } = useGetAllLeads();

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 px-4"
        >
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto">
            <LogIn className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Admin Access Required
          </h1>
          <p className="text-muted-foreground max-w-sm">
            Please log in to access the admin dashboard.
          </p>
          <Button
            type="button"
            onClick={login}
            disabled={loginStatus === "logging-in"}
            data-ocid="admin.login.primary_button"
            className="gold-gradient text-primary-foreground font-semibold px-8"
          >
            {loginStatus === "logging-in" ? "Connecting..." : "Login"}
          </Button>
        </motion.div>
      </div>
    );
  }

  if (isAdminLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-background pt-16"
        data-ocid="admin.loading_state"
      >
        <div className="space-y-4 w-full max-w-2xl px-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-16">
        <div
          className="text-center space-y-4 px-4"
          data-ocid="admin.error_state"
        >
          <Shield className="h-12 w-12 text-destructive mx-auto" />
          <h1 className="font-display text-2xl font-bold text-foreground">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You don't have admin permissions.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1_000_000).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-xs font-semibold mb-2">
            Dashboard
          </p>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Lead Management
          </h1>
          <p className="text-muted-foreground mt-1">
            {leads?.length ?? 0} total lead{leads?.length !== 1 ? "s" : ""}{" "}
            collected
          </p>
        </motion.div>

        {leadsLoading ? (
          <div className="space-y-3" data-ocid="admin.leads.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : !leads || leads.length === 0 ? (
          <div
            data-ocid="admin.leads.empty_state"
            className="text-center py-20 border border-dashed border-border rounded-lg"
          >
            <p className="text-muted-foreground">No leads submitted yet.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-lg border border-border overflow-hidden">
              <Table data-ocid="admin.leads.table">
                <TableHeader>
                  <TableRow className="bg-card hover:bg-card">
                    <TableHead className="text-muted-foreground font-semibold">
                      #
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Name
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Phone
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Email
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      Date Submitted
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead, i) => (
                    <TableRow
                      key={`${lead.name}-${i}`}
                      data-ocid={`admin.leads.row.${i + 1}`}
                      className="border-border hover:bg-card/50"
                    >
                      <TableCell className="text-muted-foreground text-sm">
                        {i + 1}
                      </TableCell>
                      <TableCell className="text-foreground font-medium">
                        {lead.name}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {lead.phone}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {lead.email || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(lead.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
