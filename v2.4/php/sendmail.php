<?php
// Get the form fields and remove whitespace
$name = strip_tags(trim($_POST["name"]));
$name = str_replace(array("\r","\n"),array(" "," "),$name);
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$message = trim($_POST["message"]);

// Check for empty fields
if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Udfyld venligst alle felter.";
    exit;
}

// Set the email headers
$headers = "From: webside@hoerbar.dk\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Return-Path: {$email}\r\n";

// Set the email subject and body
$subject = "Besked fra hjemmeside";
$body = "Navn: {$name}\n\nE-mail-adresse: {$email}\n\nBesked: {$message}";

// Send the email
$mailTo = "kontakt@hoerbar.dk";
$mailFrom = "webside@hoerbar.dk";
$mailSubject = "{$subject}";
$mailBody = "{$body}";
$mailHeaders = "{$headers}";

if (mail($mailTo, $mailSubject, $mailBody, $mailHeaders)) {
    ?>
    <h5>Mange tak for din besked!</h5>
    <p>Vidste du at lyd rejser gennem luften med omkring 343 meter i sekundet? Vi kan ikke besvare din henvendelse med lydens hast, men vi vil forsøge at vende tilbage til dig hurtigst muligt.</p>
    <?php
} else {
    ?>
    <h5>Hmm.. Noget gik galt!</h5>
    <p>Der er åbenbart støj på linjen! Kører du gennem en tunnel? Nej, nok ikke. Vi beklager fejlen, og opfordrer dig i stedet til at sende os en god gammeldags e-mail.</p>
    <?php
}
