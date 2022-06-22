"use strict";
const { Event, User, MyEvent } = require("../models");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "event_lokal@outlook.com",
    pass: "Eventlokal1",
  },
});
class EventController {
  static async getAllEvent(req, res, next) {
    try {
      const event = await Event.findAll({
        order: [["id", "DESC"]],
      });

      res.status(200).json({
        statusCode: 200,
        data: event,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getMyEvent(req, res, next) {
    try {
      const { id: UserId, email: author } = req.user;
      const event = await MyEvent.findAll({
        where: {
          UserId ,
        },
        include: [Event]
      });

      res.status(200).json({
        statusCode: 200,
        data: event,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createEvent(req, res, next) {
    try {
      const { name, type, date, status, location, time, description, imgUrl } =
        req.body;
      const { email: author } = req.user;

      if (!author) {
        throw { name: "Forbidden" };
      }

      const createdEvent = await Event.create({
        name,
        type,
        status,
        location,
        date,
        time,
        description,
        imgUrl,
        author,
      });

      const options = {
        from: "event_lokal@outlook.com",
        to: author,
        subject: `Event ${createdEvent.name} has been listed`,
        text: `your event ${createdEvent.name} has been listed`,
      };

      await transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(`sent: ${info.response}`);
        }
      });

      res.status(201).json({
        message: "Event added",
        data: createdEvent,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async updateEvent(req, res, next) {
    try {
      const eventId = req.params.id;
      const { name, type, status, location, time, description, imgUrl } =
        req.body;
      const { email } = req.user;
      const data = {
        name,
        type,
        status,
        location,
        date: new Date(),
        time,
        description,
        imgUrl,
        author: email,
      };

      const before = await Event.findByPk(eventId);

      if (!before) {
        throw { name: "eventNotFound" };
      }

      console.log(before.name, "INIIIIIIIIII BEFORE");

      console.log(email, before.author);

      if (email != before.author) {
        throw { name: "Forbidden" };
      }
      const updatedEvent = await Event.update(data, {
        where: {
          id: eventId,
        },
        returning: true,
      });

      let newValue = await Event.findByPk(eventId, {
        include: [User],
      });

      console.log(newValue.Users.length, "ini NEWWWWWWWW");

      for (let e of newValue.Users) {
        transporter.sendMail(
          {
            from: "event_lokal@outlook.com",
            to: e.email,
            subject: `Your subscribed event ${before.name} has been changed`,
            text: `  
          name:         ${newValue.name}
          type:           ${newValue.type}
          location:     ${newValue.location}
          date:           ${newValue.date}
          time:           ${newValue.time}
          description:  ${newValue.description}
          posted by:    ${newValue.author}

          `,
          },
          function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log(`sent: ${info.response}`);
            }
          }
        );
      }
      const options = {
        from: "event_lokal@outlook.com",
        to: email,
        subject: `Event ${before.name} has been updated`,
        text: `  
        name:         ${newValue.name}
        type:           ${newValue.type}
        location:     ${newValue.location}
        date:           ${newValue.date}
        time:           ${newValue.time}
        description:  ${newValue.description}
        posted by:    ${newValue.author}
        
        `,
      };

      await transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(`sent: ${info.response}`);
        }
      });

      res.status(200).json({
        message: `Event ${before.name} updated`,
        data: updatedEvent.name,
        subscribers: newValue.Users,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async attendEvent(req, res, next) {
    try {
      const EventId = req.params.id;
      const { id: UserId, email: author } = req.user;

      if (!UserId) {
        throw { name: "Forbidden" };
      }

      const checkMyEvent = await MyEvent.findAll({
        where: {
          [Op.and]: [{ EventId }, { UserId }],
        },
        include: [Event]
      });

      if(checkMyEvent.length !== 0) {
        throw { name: "exist" };
      } 
      

      const myEvent = await MyEvent.create({
        UserId,
        EventId,
      });

      let attendedEvent = await MyEvent.findByPk(myEvent.id, {
        include: [User, Event],
      });

      const options = {
        from: "event_lokal@outlook.com",
        to: attendedEvent.User.email,
        subject: `You're following to ${attendedEvent.Event.name} event`,
        text: `Here's the info for the event

        name:         ${attendedEvent.Event.name}
        type:           ${attendedEvent.Event.type}
        location:     ${attendedEvent.Event.location}
        date:           ${attendedEvent.Event.date}
        time:           ${attendedEvent.Event.time}
        description:  ${attendedEvent.Event.description}
        posted by:    ${attendedEvent.Event.author}

        For further info and details please contact person as mentioned above 
        `,
      };

      await transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(`sent: ${info.response}`);
        }
      });

      res.status(201).json({
        message: `Event ${attendedEvent.Event.name} added to my event`,
        data: myEvent,
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async unattendEvent(req, res, next) {
    try {
      const EventId = req.params.id;
      const { id: UserId, email: author } = req.user;

      if (!UserId) {
        throw { name: "Forbidden" };
      }

      const myEvent = await MyEvent.findAll({
        where: {
          [Op.and]: [{ EventId }, { UserId }],
        },
        include: [Event]
      });

      console.log(myEvent[0].Event.name);

      if(!myEvent) {
            throw { name: "eventNotFound" };
      }

      console.log(myEvent[0].UserId, UserId);

      if (myEvent[0].UserId !== UserId) {
        throw { name: "Forbidden" };
      }

      await MyEvent.destroy({
        where: {
          UserId,
          EventId,
        },
      });


      res.status(201).json({
        message: `Event ${myEvent[0].Event.name} removed from my event`,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = EventController;
