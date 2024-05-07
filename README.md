# 📅 Ignite Call
I developed this project during classes and as a challenge of my latest studies on React lessons at [Rocketseat](https://www.rocketseat.com.br).

<br>

<p align="center">
  <img alt="Ignite Call Project Preview" src="https://github.com/rcrdk/ignite-call/blob/main/public/preview.jpg?raw=true" width="100%" />
</p>

## 🚀 Techs and Tools

- [React](https://reactjs.org) + [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Stitches](https://stitches.dev)
- [NextAuth.js](https://next-auth.js.org/) + [Google oAuth](https://developers.google.com/identity/protocols/oauth2) + [Google Calendar API](https://developers.google.com/calendar/api/v3/reference)
- PostgreSQL + [Prisma](https://www.prisma.io/) + [Neon](https://neon.tech/)
<!-- DAYJS -->

## 🎨 About 

This project was developed based on a figma design provied by the school. The main practice was to code a full-stack free time scheduling app. On the app the client signup and at the end of process it's provied a exclusive scheduling link where users can schedule an appointment on available times.

It was used NextAuth.js along with Google Account integration for authentication and saving schedulings at Google Calendar. All data was stored using a PostgreSQL database, in production was setted a Neon database. Prisma was used to interact and manage wih database.

The client signup is in four steps: (1) insert their username and full name; (2) Connect with Google Account and set permissions for Google Calendar; (3) Set datetime intervals of availability; (4) Set a bio short text. As signup is done, the client is redirected to their schedule page: (1) All days available are shown on calendar; (2) by selecting a date, all datetimes available are loaded; (3) by choosing a time, the last step is fill user contact information and observations that will be inserted on datebase and on Google Calendar.

## 🔗 Links

- [Design / Figma](https://www.figma.com/file/7YqU1dK7nzH7xw5hTosJ2w/Aula-%2B-Desafio---Ignite-Call?type=design&node-id=0%3A1&mode=design&t=x1lT1szFO8DXamn4-1)
- [Deploy](https://ignite-call-self-phi.vercel.app)

## ⚙️ Enviroment Variables

```shell
# Database PostgreSQL
DATABASE_URL=""
DATABASE_DIRECT_URL=""

# Google oAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Next Auth
NEXTAUTH_URL=""
NEXTAUTH_SECRET=""

# Google Calendar V3
GOOGLE_CALENDAR_ID="primary"
```
