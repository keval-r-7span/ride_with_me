// import { createLogger, format, transports } from 'winston';
// import { combine, timestamp, printf }  = format;

// const myFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp}  ${level}: ${message}`;
// });

// const customLogger = () => {
//   return createLogger({
//     level: "info",
//     format: combine(
//       format.colorize(),
//       timestamp({ format: "HH:mm:ss" }),
//       myFormat
//     ),
//     transports: [new transports.Console()],
//   });
// };

// let logger = null;

// if (process.env.NODE_ENV !== "production") {
//   logger = customLogger();
// }

// export default logger;