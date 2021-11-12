<?php
session_start();

    include("connection.php");
    include("function.php");


    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
       //SOMETHING WAS POSTED 
       $firstname = $_POST['firstname'];
       $lastname = $_POST['lastname'];
       $study = $_POST['study'];
       $password = $_POST['password'];

       if(!empty($firstname) && !empty($lastname) && !empty($study) && !empty($password) && !is_numeric($firstname))
       {

        //save to db
        $user_id = random_num(20);
        $query = "insert into users (user_id,firstname,lastname,study,password) values ('$user_id','$firstname','$lastname','$study','$password')";


        mysqli_query($con, $query);

        header("Location: login.php");
        die;
       }else
       {
           echo "please provide valid information";
       }
    }



?>

<!Doctype html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CS60APA Registration-Form</title>
    <!--<link rel="stylesheet" href="style.css">-->
</head>
<style>
    /* Style the entire page */
    * {
        box-sizing: border-box;
    }

    /* Style the form */
    form {
        width: 400px;
        border: 3px solid rgb(53, 50, 50);
        margin: 0 auto;
    }

    /* Style the label font weight */
    label {
        font-weight: bold;
    }

    /* Adding some padding in form */
    .form-container {
        padding: 16px;
    }

    /* Style the img-container */
    .img-container {
        text-align: center;
        margin: 24px 0 12px 0;
    }

    .img-container img {
        width: 40%;
        border-radius: 50%;
    }

    /* Style inputs and textarea */
    .form-text {
        width: 100%;
        padding: 10px 14px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
    }

    /* change outline when click in inputs and textarea */
    .form-text:focus {
        outline: 1px solid cadetblue;
    }

    /* Style the Login button */
    .login-btn {
        background-color: #04aa6d;
        padding: 10px 14px;
        color: white;
        margin: 8px 0;
        border: none;
        width: 100%;
        cursor: pointer;
    }

    /* Change background color of submit button when hover */
    .login-btn:hover {
        opacity: 0.8;
    }

    /* change the background color of forget container */
    .background {
        background-color: #f1f1f1;
    }

    /* style the forget link color */
    .forget a {
        color: #0088cc;
    }

    @media only screen and (min-device-width:275px) and (max-device-width:768px) {
        form {
            width: 100%;
        }
    }
</style>

<body>
    <form action="" method="POST">
        <div class="form-container">

            <div class="img-container">

                <img src="avatar.png" alt="avatar">

            </div>

            <label for="username">FirstName</label>
            <input type="text" name="firstname" placeholder="Enter FirstName" class="form-text" required>

            <label for="username">LastName</label>
            <input type="text" name="lastname" placeholder="Enter LastName" class="form-text" required>

            <label for="study">Study</label>
            <input type="text" name="study" placeholder="Enter your Study Area" class="form-text" required>

            <label for="password">Password</label>
            <input type="password" name="password" placeholder="Enter Password" class="form-text">

            <button type="submit" class="login-btn"  value="Login" >Login</button>

        </div>

        <div class="form-container background">

            <span class="forget">Login <a href="#">Login</a></span>

        </div>

    </form>
</body>

</html>