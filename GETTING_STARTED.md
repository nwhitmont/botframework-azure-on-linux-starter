# How To Deploy Node.js Bot Framework To Azure On Linux


## Introduction
[Microsoft Bot Framework](https://dev.botframework.com/) [SDK for Node.js](https://docs.botframework.com/en-us/node/builder/overview/#navtitle) allows developers to build text and voice based chatbots and connect them to a variety of channels including Skype, Cortana, MS Teams, Slack, Facebook, Telegram, SMS, email, and more.

As a Node.js bot developer you may have asked yourself - "Can I deploy my bot to Azure on Linux?" - and yes, it is now possible using the Azure App Service for Linux (Preview). This article will help you get started with Azure bot deployments on Linux using the Node.js SDK for Bot Framework.  I will walk you though the steps to setup your bot with Continuous Deployment via GitHub, and point out some commen pitfalls and how to avoid them.


## Step 0 - Setting Up The Developer Environment
In order to follow along with this tutorial you will need the following apps and accounts:
- Microsoft Account (MSA) - Use your existing account, or [click here to create a new account.](https://account.microsoft.com/account)
- GitHub Account - Use your existing account, or [sign up now.](https://github.com)
- Visual Studio Code IDE - Available for [free download here](https://code.visualstudio.com/)
- Azure Account - Use your MSA Account to sign-in to the [Azure Portal](https://portal.azure.com)
- GitHub Desktop - [Download here](https://desktop.github.com/)
- Chocolatey, The Package Manager for Windows - [Install instructions](https://chocolatey.org/install)
- Node Version Manager (NVM) - Install via Chocolatey: `C:\> choco install nvm` - [instructions](https://chocolatey.org/packages/nvm)
- Node.js LTS 6.x.x + npm - Install via NVM: `C:\> nvm install 6.10.3`

After installing and configuring all of the above listed software and accounts, continue to Step 1.

## Step 1 - Sign in to GitHub and Fork the Starter Project
Sign into [GitHub](https://github.com) and navigate to the starter project [nwhitmont/botframework-azure-on-linux-starter](https://github.com/nwhitmont/botframework-azure-on-linux-starter).  The starter project contains a working example bot written with BotBuilder SDK for Node.js, as well as some settings we will use to configure our bot deployment to Azure App Service on Linux.

![Fork the starter project on GitHub](nwhitmont.github.com/botframework-azure-on-linux-starter/img/step-2-azure-new-item.png)


