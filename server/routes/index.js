const { badRequestException, errHandler } = require("../middlewares/error-handler.midd")
const auth = require("./auth.route")
const user = require("./user.route")
const payment = require("./payment.route")
const post = require("./post.route")
const news = require("./news.route")
const order = require("./order.route")
// const chatbot = require("./chatbot.route")  // feature added after thesis defense
// const room = require("./room.route")          // feature added after thesis defense
// const bill = require("./bill.route")           // feature added after thesis defense

const initRoutes = (app) => {
  app.use("/api/v1/user", user)
  app.use("/api/v1/auth", auth)
  app.use("/api/v1/order", order)
  app.use("/api/v1/news", news)
  app.use("/api/v1/post", post)
  app.use("/api/v1/payment", payment)
  // app.use("/api/v1/chatbot", chatbot)  // feature added after thesis defense
  // app.use("/api/v1/room", room)          // feature added after thesis defense
  // app.use("/api/v1/bill", bill)           // feature added after thesis defense

  app.use(badRequestException)
  app.use(errHandler)
}

module.exports = initRoutes

