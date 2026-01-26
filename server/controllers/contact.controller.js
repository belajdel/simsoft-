const nodemailer = require('nodemailer');

exports.sendMessage = async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !message) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    // Configure Transporter (You should use Environment Variables for credentials)
    // Example for Gmail (requires "App Password" if 2FA is on)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'votre.email@gmail.com', // TODO: Remplacer par variables d'env
            pass: 'votre_mot_de_passe_app' // TODO: Remplacer par variables d'env
        }
    });

    const mailOptions = {
        from: email,
        to: 'contact@simsoft.tn',
        subject: `[Site Contact] ${subject}`,
        text: `Nouveau message de: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent from ${email}`);
        res.status(200).send({ message: "Message sent successfully via Email!" });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).send({
            message: "Error sending email. Please try again later.",
            error: error.message
        });
    }
};
