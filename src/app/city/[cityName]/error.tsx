"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center pt-32">
      <Card className="max-w-lg w-full shadow-lg">
        <CardHeader className="flex flex-col items-center text-center">
          <AlertTriangle className="mb-4 h-16 w-16 text-destructive" />
          <CardTitle className="text-2xl">
            Oops! Something went wrong.
          </CardTitle>
          <CardDescription className="text-muted-foreground max-w-xs">
            We ran into an unexpected problem loading this page.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              aria-expanded={showDetails}
            >
              {showDetails ? "Hide Details" : "Show Details"}
            </Button>

            {showDetails && (
              <pre
                role="alert"
                className="whitespace-pre-wrap rounded border border-muted p-4 text-sm font-mono text-destructive w-full max-h-48 overflow-auto"
              >
                {error.message}
                {error.digest && `\n\nError ID: ${error.digest}`}
              </pre>
            )}

            <Button
              variant="destructive"
              onClick={() => reset()}
              className="w-full"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
