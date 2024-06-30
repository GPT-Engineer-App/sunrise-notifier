import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Index = () => {
  const [location, setLocation] = useState(null);
  const [sunriseTime, setSunriseTime] = useState(null);

  useEffect(() => {
    if (location) {
      fetchSunriseTime(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchSunriseTime = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`
      );
      const data = await response.json();
      if (data.status === "OK") {
        setSunriseTime(new Date(data.results.sunrise).toLocaleTimeString());
      } else {
        toast.error("Failed to fetch sunrise time.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching sunrise time.");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          toast.error("Geolocation is not supported by this browser.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Sunrise Time Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={getLocation}>Get Sunrise Time</Button>
          {sunriseTime && (
            <p className="mt-4">Sunrise Time: {sunriseTime}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;