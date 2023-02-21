import { prisma } from "@/lib/db/client";
import { comparePasswords } from "@/lib/passwords/comparePasswords";
import { hashPassword } from "@/lib/passwords/hashPassword";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      if (req.body.username) {
        const user = await prisma.user.findFirst({
          where: {
            username: req.body.username,
          },
        });

        if (!user) {
          const existingEmail = await prisma.user.findFirst({
            where: {
              email: req.body.email,
            },
          });

          if (!existingEmail) {
            if (req.body.email) {
              if (req.body.email.includes("@")) {
                if (req.body.password) {
                  if (req.body.cPassword) {
                    if (req.body.password.trim().length > 7) {
                      const regex =
                        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{7,}$/;

                      if (regex.test(req.body.password)) {
                        const samePasswords = comparePasswords(
                          req.body.password,
                          req.body.cPassword
                        );

                        if (samePasswords) {
                          const hashedPass = await hashPassword(
                            req.body.password
                          );

                          const newUser = await prisma.user.create({
                            data: {
                              username: req.body.username,
                              email: req.body.email,
                              password: hashedPass,
                            },
                          });

                          res.status(200).json({
                            message: `${req.body.username} has been successfully created!`,
                          });
                        } else {
                          res.status(400).json({
                            message:
                              "Please make sure that both your passwords match!",
                          });
                        }
                      } else {
                        res.status(400).json({
                          message:
                            "Please make sure that your password includes at least uppercase and lowercase letters, a number and a special character.",
                        });
                      }
                    } else {
                      res.status(400).json({
                        message:
                          "Make sure that your password has more than 7 characters.",
                      });
                    }
                  } else {
                    res.status(400).json({
                      message: "Please confirm your password.",
                    });
                  }
                } else {
                  res.status(400).json({
                    message: "Please make sure you enter a password.",
                  });
                }
              } else {
                res.status(400).json({
                  message: "Please enter a valid email!",
                });
              }
            } else {
              res.status(400).json({
                message: "Please make sure to fill in your email!",
              });
            }
          } else {
            res.status(400).json({
              message: "This email is already in use!",
            });
          }
        } else {
          res.status(400).json({
            message: "This user already exists!",
          });
        }
      } else {
        res.status(400).json({
          message: "Please make sure to enter a username!",
        });
      }
    } catch (err) {
      res.json({
        message: `There was an error in creating the user - ${err}`,
        ok: false,
      });
    }
  } else {
    res.status(405).json({
      message: "The method you attempted isn't allowed.",
      ok: false,
    });
  }
}
