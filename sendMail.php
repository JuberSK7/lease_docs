<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

// Check if form submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $tel = $_POST['tel'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        // SMTP Settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@maharentagreement.com'; 
        $mail->Password   = 'Maharentagreement@2017'; 
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('info@maharentagreement.com', 'Maha Rent Agreement');
        $mail->addAddress('leasedocsindia@gmail.com'); 

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Inquiry from Website";
        $mail->Body = "
            <h3>New Inquiry Received</h3>
            <p><b>Name:</b> $name</p>
            <p><b>Email:</b> $email</p>
            <p><b>Phone:</b> $tel</p>
            <p><b>Message:</b><br>$message</p>
        ";

        $mail->send();
        echo "Success! Your message has been sent.";
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }
}
?>
