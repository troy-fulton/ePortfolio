/*
 * This code tells the robot to use the right proximity sensors to look for an object a few
 * inches away, keep going until it finds another object a few inches away, and parallel
 * park in between the two objects. The distance from the robot to the objects has a wide
 * range (maybe about 1-4 inches) since the brightness levels are so low, but when I put
 * shiny tape on the side of the close object, it was always able to detect the close object.
 */

 
#include <Wire.h>
#include <Zumo32U4.h>

Zumo32U4LCD LCD;
Zumo32U4ButtonA buttonA;
Zumo32U4Motors motors;
Zumo32U4ProximitySensors psensors;
int left_counts;  // Count of brightness signals received
int right_counts;
uint16_t BL[6] = {2,2,2,2,2,2};    // the "brightness levels"

// Function for parallel parking between two boxes
void parallelPark() {
    delay(500);
    motors.setSpeeds(-75,-75);
    delay(500);
    motors.setSpeeds(-140,0);
    delay(750);
    motors.setSpeeds(-75,-75);
    delay(750);
    motors.setSpeeds(0,-140);
    delay(750);
    motors.setSpeeds(75,75);
    delay(400);
    motors.setSpeeds(0,0);
}

// The entire code lies in this function: 
void setup() {
  // Set up the sensors and motors:
  psensors.initThreeSensors();
  psensors.read();
  motors.setSpeeds(100, 100);
  
  // Enter the pointer and number of elements in the array:
  psensors.setBrightnessLevels(BL, 6);

  // Look for the box:
  while (left_counts + right_counts < 6) {
    psensors.read();
    left_counts = psensors.countsRightWithLeftLeds();
    right_counts = psensors.countsRightWithRightLeds();
    LCD.clear();
    LCD.print(left_counts+right_counts);
  }

  // Go past the box:
  while (left_counts + right_counts >= 5) {
    psensors.read();
    left_counts = psensors.countsRightWithLeftLeds();
    right_counts = psensors.countsRightWithRightLeds();
    LCD.clear();
    LCD.print(left_counts+right_counts);
  }

  int count = 0;
  // Go to the next box:
  while (left_counts + right_counts < 6) {
    psensors.read();
    left_counts = psensors.countsRightWithLeftLeds();
    right_counts = psensors.countsRightWithRightLeds();
    LCD.clear();
    LCD.print(left_counts+right_counts);
    // Count milliseconds (sort of- really counting the number of iterations
    // of the while loop, but we can use it to tell how long the gap is between
    // the boxes):
    delay(1);
    count++;
  }

  // Display the number of milliseconds counted between the first box and 
  // the second and stop the robot for 2 seconds:
  motors.setSpeeds(0,0);
  LCD.clear();
  LCD.print(count);
  delay(2000);

  parallelPark();
}

void loop() { /* Only meant to be run one time (press reset to run again) */ }
