<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Controller\ApostilasController;
require 'vendor/autoload.php';

$mail = new PHPMailer(true); 

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'marcosviniciusjahu@gmail.com';
    $mail->Password   = 'Zrcx2005#';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('mvaraujowebsites@gmail.com', 'Marcos Vinicius');
    $mail->addAddress($email, $fullName);
    $mail->Subject = mb_encode_mimeheader('🎉 Minha dúvida: ' . $model . ' e '. $max);
     $mail->isHTML(true);
    $mail->Body    = "
<html>
<head> <style>
                   @font-face {
                        font-family: 'Forum', serif;
                        src: url('https://fonts.googleapis.com/css2?family=Forum&display=swap');
                        font-family: 'Forum', serif;
                        src: url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
                    }
                    body {
                        background:url(/View/Imagens/fundo_celular.png);
                    }
                    h1{
                       font-family: 'Forum', serif;
                        src: url('https://fonts.googleapis.com/css2?family=Forum&display=swap');
                    }
                     h2 {
                        font-weight: bold; 
                       font-family: 'Forum', serif;
                        src: url('https://fonts.googleapis.com/css2?family=Forum&display=swap');
                    }
                    p {
                        src:url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
                    }
                </style></head>
<body>
    <h1>Olá $fullName</h1>
    
    <p>Espero que este e-mail te encontre cheio de entusiasmo! 🚀</p>

    <h2> Detalhes da compra: </h2><p>$description</p>
    <h2>Valor Compra R$: </h2><p>Total Compra R$ : $valor</p>
    
    <h3>Lembre-se, a jornada do aprendizado é tão empolgante quanto a conquista final. Estamos aqui para apoiar você em cada passo.</h3>
    
    <h3>Se houver algo com que possamos ajudar ou se tiver alguma dúvida, não hesite em nos contatar. Estamos sempre aqui para você!</h3>
 
    <h4>Atenciosamente,<br>Equipe do Inglês Aqui</h4>
</body>
</html>
";
    $mail->send();
    echo 'E-mail enviado com sucesso!';
} catch (Exception $e) {
    echo "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
}
?>
