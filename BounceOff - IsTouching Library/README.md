# BounceOFF - Library

## Table Of Content:
1. [Description](#description)
2. [Installation](#installation)
   1. [Method 1](#method-1)
   2. [Method 2](#method-2)
3. [Setting up the dev environment](#how-to-setup-dev-environment)
4. [Creating custom client](#custom-client-setup)
5. [How to use](#how-to-use)

## Description:

The BounceOFF library is a simple JavaScript library designed to facilitate collision detection and bounce behavior in 2D environments. It provides two main functions, isTouching and bounceOff, which enable developers to detect collisions between two objects and apply bounce behavior accordingly.

## Installation:

**Note:** *This library requires a web server and the p5.js library to function properly.*

To install the BounceOFF library, follow these steps:

### Method 1:
1. Clone the BounceOFF repository from GitHub.
2. Include the `bounceoff.js` file in your project directory.
3. Ensure that you have a web server set up to serve your project files.

### Method 2:
1. Download the `bounceoff.js` file from the GitHub repository.
2. Place the file in your project directory.
3. Make sure you have a web server installed to serve your project files.

## How To Setup Dev Environment:

To set up the development environment for using the BounceOFF library, follow these steps:

1. Install Visual Studio Code (VSCode) or any other code editor of your choice.
2. Install a web server to serve your project files.
3. Include the p5.js library in your project.

#### The setup is done.

## How To Use:

To utilize the BounceOFF library in your project, follow these guidelines:

1. **isTouching(body1, body2):**
   - This function detects whether two objects are touching each other.
   - Parameters:
     - `body1`: The first object with properties `x`, `y`, `width`, and `height`.
     - `body2`: The second object with properties `x`, `y`, `width`, and `height`.
   - Returns:
     - `true` if the objects are touching.
     - `false` if the objects are not touching.

2. **bounceOff(body1, body2):**
   - This function applies bounce behavior to two objects when they collide.
   - Parameters:
     - `body1`: The first object with properties `x`, `y`, `width`, `height`, and `velocityX`, `velocityY`.
     - `body2`: The second object with properties `x`, `y`, `width`, `height`, and `velocityX`, `velocityY`.
   - Returns:
     - Modifies the `velocityX` and `velocityY` properties of the objects to create bounce behavior.
