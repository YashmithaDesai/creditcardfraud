<?php 
  session_start(); 

  if (!isset($_SESSION['username'])) {
    $_SESSION['msg'] = "You must log in first";
    header('location: login.php');
  }
  if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['username']);
    header("location: login.php");
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-image:url('python.jpg');
	    background-repeat: no-repeat;
	    background-size:cover;
	    
        }

        .header {
            background-color: #333;
            color: #fff;
            padding: 15px 0;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .header h2 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .content p {
            font-size: 18px;
            line-height: 1.6;
        }

        .content a {
            color: #3498db;
            text-decoration: none;
            font-weight: bold;
        }

        .content a:hover {
            text-decoration: underline;
        }

        .notification {
            background-color: #e74c3c;
            color: #fff;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .success {
            background-color: #2ecc71;
        }
    </style>
</head>
<body>

<div class="header">
    <h2>Welcome</h2>
</div>

<div class="content">
    <!-- notification message -->
    <?php if (isset($_SESSION['success'])) : ?>
        <div class="notification success">
            <h3>
                <?php 
                    echo $_SESSION['success']; 
                    unset($_SESSION['success']);
                ?>
            </h3>
        </div>
    <?php endif ?>

    <!-- logged in user information -->
    <?php  if (isset($_SESSION['username'])) : ?>
        <p>Welcome <strong><?php echo htmlspecialchars($_SESSION['username']); ?></strong></p>
	<p><a href="http://127.0.0.1:5000/ " style="color:blue;">For detecting fraud click here</a></p>
        <p><a href="index.php?logout='1'" style="color: #e74c3c;">Logout</a></p>
    <?php endif ?>
</div>

</body>
</html>
