<?php
session_start();

    include("connection.php");
    include("function.php");

    $user_data = check_login($con);

?>

<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta
        content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,target-densitydpi=160"
        name="viewport" />
    <meta name="google-site-verification" content="CEhb1NNHLQ4klcuczJvERcX-C7xpyXPcwAB29LLiQgY" />
    <title>CS60apa Inc</title>
    <link rel="dns-prefetch" href="//cdn.asaha.com" />
    <meta name="yandex-verification" content="587d3e9c8ef97ef2" />
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script>var lang = { "js_save_to_my_drive": "Save<span class=\"hidemobile\"> to My Drive<\/span>", "js_save_to_my_drive_2": "Save to My Drive", "js_like": "Like", "js_search_for_books": "Search for books, tutorials, manuals and authors in %s files", "js_remote_file_unavailable_try_again": "Remote file seems unavailable right now, please try again later.", "js_save_file_for_quick_download": "You need to save the file to your drive for <strong>Quick Download<\/strong> feature.", "js_save_file_for_quick_preview": "You need to save the file to your drive for <strong>Quick Preview<\/strong> feature.", "js_remote_file_downloaded": "Remote file downloaded to <a href=\"\/home\/cloud\">My Drive.<\/a><br\/>Now you can preview and download it faster.", "js_added_to_wishlist": "Book added to your wishlist<br\/>We will let you know when the book is available.", "js_an_error_occurred": "An error occurred, please try again later.", "js_out_of_storage": "You\u2019re out of storage space and you can't save files to your drive until you\u00a0<a href=\"\/home\/cloud\" style=\"color:#0921EA;text-decoration:underline;\">free up space<\/a>\u00a0or\u00a0<a href=\"\/premium\" style=\"color:#0921EA;text-decoration:underline;\">purchase additional storage.<\/a>", "js_deleted_copyright": "Sorry, this file has been deleted due to copyright infringement!" };</script>
    <meta property="og:url" content="http://www.marksikaundi.me/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="CS60APA Inc scientific Technology" />
    <meta property="og:description"
        content="CS60APA Inc is the research based platform to explore beyond your imagination" />
    <meta property="og:image" content="https://www.marksikaundi.me/assets/img/logo-og-2.png" />
    <meta property="og:image:width" content="464" />
    <meta property="og:image:height" content="600" />
    <meta name="msvalidate.01" content="BC5450558E65B418CA902EF01FD0D85E" />
    <script>var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-118355843-2']); _gaq.push(['_trackPageview']); (function (i, s, o, g, r, a, m) { i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () { (i[r].q = i[r].q || []).push(arguments) }, i[r].l = 1 * new Date(); a = s.createElement(o), m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m) })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga'); ga('create', 'UA-154495440-1', 'auto'); ga('send', 'pageview');</script>
    <script>var user = { member: '0', premium: '0', email: '0', customer_id: '0', card_removed: '0' }; var page = 'index';</script>
    <link href="/favicon.ico" rel="shortcut icon" />
</head>

<body>
    <div id="progress" class="waiting">
        <dt></dt>
        <dd></dd>
    </div>
    <div id="top-menu-bg">
        <div class="header FixedTop" id="header">
            <div id="logo">
                <a href=""><h3>CS60APA Inc</h3>
                    <!--<img src="/assets/icudtech.png" id="logo-img" border="0" title=""
                        alt="Evelyn Technology Research" />-->
                </a>
            </div>
            <form action="/search" id="m-search-form">
                <input type="text" maxlength="200" name="q" id="m-q" autocomplete="off" placeholder="Search for something here"
                    value="" required />
                <button type="submit"
                    style="position: absolute;top: 13px;right: 12%;color: #6b6b6b;border: none;padding: 0;background: none;">
                    <i class="fa fa-search search-button" style="font-size: 20px !important;" aria-hidden="true"></i>
                </button>
                <input type="hidden" name="r" value="1" id="r" />
            </form>
            <div id="form-container" style="position: relative;">
                <form action="/search" id="search-form" class="form-wrapper cf hidemobile">
                    <input type="text" maxlength="200" name="q" id="q" autocomplete="off"
                        placeholder="The team welcome you, Here is your search windows" value="" required />
                    <button type="submit"><i class="fa fa-search search-button" aria-hidden="true"></i></button>
                    <input type="hidden" name="pagecount" value="" id="pagecount-hidden" />
                    <input type="hidden" name="pubyear" value="" id="pubyear-hidden" />
                    <input type="hidden" name="searchin" value="" id="searchin-hidden" />
                    <input type="hidden" name="em" value="" id="em-hidden" />
                </form>
            </div>
            <div class="user-info clearfix">
                <a href="/donate.html" id="upload-top" class="user-info-inner"><i class="fa fa-heart" aria-hidden="true"
                        style="color:#FC121E"></i> Donate</a>
                <a href="https://www.github.com/marksikaundi" id="premium-top" class="user-info-inner"
                    style="color: #1db954;font-weight: 500;margin-right: 13px;font-size: 17px;">Gthub</a>
                <a class="btn-g hidemobile" href="/php/sign.php" role="button" rel="nofollow">Sign in</a>
                <button id="btnLang" type="button"
                    class="btn btn-primary btn-more dropdown-toggle dropdown-toggle-no-arrow hidemobile"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin: -2px 0px 0px 5px;">
                    <i class="fas fa-globe"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right hidemobile" aria-labelledby="btnLang">
                    <a href="https://www.marksikaundi.me/home/setLocal?url=" rel="nofollow" class="dropdown-item"
                        onclick="ga('send', 'event', 'ChangeLanguage', 'English');">English</a>
                    <a href="https://es.marksikaundi.me/home/setLocal?url=" rel="nofollow" class="dropdown-item"
                        onclick="ga('send', 'event', 'ChangeLanguage', 'Español');">Español</a>
                    <a href="https://ru.marksikaundi.me/home/setLocal?url=" rel="nofollow" class="dropdown-item"
                        onclick="ga('send', 'event', 'ChangeLanguage', 'Русский');">Русский</a>
                    <a href="https://www.marksikaundi.me/home/setLocal?url=" rel="nofollow" class="dropdown-item"
                        onclick="ga('send', 'event', 'ChangeLanguage', 'Türkçe');">Türkçe</a>
                </div>
            </div>
            <button id="btnLangMobile" type="button"
                class="btn btn-primary btn-more dropdown-toggle dropdown-toggle-no-arrow hidedesktop"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-globe"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right hidemobile" aria-labelledby="btnLangMobile">
                <a href="https://www.marksikaundi.me/home/setLocal?url=" rel="nofollow" class="dropdown-item"
                    onclick="ga('send', 'event', 'ChangeLanguage', 'English');">English</a>
                <a href="https://es.marksikaundi.me/home/setLocal?url=" rel="nofollow" class="dropdown-item"
                    onclick="ga('send', 'event', 'ChangeLanguage', 'Español');">Español</a>
                <a href="https://ru.marksikaundi.me/home/setLocal?url=" rel="nofollow" class="dropdown-item"
                    onclick="ga('send', 'event', 'ChangeLanguage', 'Русский');">Русский</a>
                <a href="https://www.marksikaundi.me/home/setLocal?url=" rel="nofollow" class="dropdown-item"
                    onclick="ga('send', 'event', 'ChangeLanguage', 'Türkçe');">Türkçe</a>
            </div>
            <a href="javascript:void(0);" id="menu-search" onClick="toggleMSearch(); window.location.hash = '';"><i
                    class="fa fa-search" id="m-search-icon"></i></a>
        </div>
        <header>
            <div class="mobile-nav-button">
                <div class="mobile-nav-button__line"></div>
                <div class="mobile-nav-button__line"></div>
                <div class="mobile-nav-button__line"></div>
            </div>
            <nav class="mobile-menu">
                <ul>
                    <li><a href="/" class="mobile-link">Home</a></li>
                    <li><a href="/categories/112.html" class="mobile-link">Most Popular</a></li>
                    <li><a href="/categories/113.html" class="mobile-link">Editor's Picks</a></li>
                    <li><a href="#categories" class="mobile-link">Explore</a></li>
                    <li><a href="/home/contact" class="mobile-link">Contact</a></li>
                    <a class="btn-g" href="https://github.com/marksikaundi" role="button"
                        onclick="ga('send', 'event', 'Premium', 'Mobile menu');"
                        style="margin: 35px 15px 0px 5px; float: right;">
                        Go Github </a>
                </ul>
                <div id="signin-mobile">
                    <a href="/sign.html">
                        <i class="fas fa-sign-in-alt" style="color: #1378D5;"></i> Sign in </a>
                </div>
            </nav>
        </header>
    </div>
    <div class="dialog">
        <div class="dialog-main">
            <div class="dialog-left">
                <div id="user-menu-header"></div>
                <div class="alert alert-info alert-dismissible fade show" role="alert" id="welcome">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="setCookie('welcomed', 'true', 60);
            ga('send', 'event', 'WelcomeClosed');" style="opacity: 0.6;">
                        <span aria-hidden="true">×</span>
                    </button>
                    <strong>CS60apa Inc</strong> is your best choice. As researcher of today we have <span id="counter" style="font-weight: 500;">75,611,046</span> eBooks and softwares for you to <strong>download for free</strong>. No annoying ads, <strong>no download limits</strong>, enjoy it and don't forget to bookmark and share the love!</div>
<div class="collection-title">
Trending eBooks about Research, science & technology <div class="addthis_inline_share_toolbox hidemobile" style="width: 100px; float:right;"></div>
</div>
                <div class="collection-title mb-2">
                    <a href=""><i class="fas fa-gem"></i> Best Books of the Week</a>
                </div>
                <div class="files-new">
                    <ul>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/living-in-the-light-a-guide-to-personal-transformation-e10172273.html"
                                            data-id="10172273">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/9b8/9b88b7c17f496a61fc78505130af288e-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/9b8/9b88b7c17f496a61fc78505130af288e-s.jpg"
                                                alt="Living in the Light: A guide to personal transformation"
                                                title="Living in the Light: A guide to personal transformation">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/living-in-the-light-a-guide-to-personal-transformation-e10172273.html"
                                            data-loc="1">
                                            <h2>Living in the Light: A guide to personal transformation</h2>
                                        </a>
                                        <div class="file-info" data-id="10172273">
                                            <span class="fi-pagecount ">258 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2001</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">2.74
                                                MB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">664,576 Downloads</span></span> <br />
                                        </div>
                                        transformation / Shakti Gawain, with Laurel King. — Completely rev such as
                                        The Path of Transformation or Creating Tru &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/give-and-take-why-helping-others-drives-our-success-e58864799.html"
                                            data-id="58864799">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/653/653f249a58f438ef343c5da5f023203d-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/653/653f249a58f438ef343c5da5f023203d-s.jpg"
                                                alt="Give and Take: WHY HELPING OTHERS DRIVES OUR SUCCESS"
                                                title="Give and Take: WHY HELPING OTHERS DRIVES OUR SUCCESS">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/give-and-take-why-helping-others-drives-our-success-e58864799.html"
                                            data-loc="2">
                                            <h2>Give and Take: WHY HELPING OTHERS DRIVES OUR SUCCESS</h2>
                                        </a>
                                        <div class="file-info" data-id="58864799">
                                            <span class="fi-pagecount ">260 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2011</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">1.57
                                                MB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">722,987 Downloads</span></span> <br />
                                        </div>
                                        “Give and Take is brimming with life-changing insights. “One of the great
                                        secrets of life is that those who win mo &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/braiding-sweetgrass-indigenous-wisdom-scientific-knowledge-and-the-teachings-of-plants-e60737077.html"
                                            data-id="60737077">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/ed5/ed59854c54d482b0efb0ee9bebbd7a72-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/ed5/ed59854c54d482b0efb0ee9bebbd7a72-s.jpg"
                                                alt="Braiding Sweetgrass: Indigenous Wisdom, Scientific Knowledge and the Teachings of Plants"
                                                title="Braiding Sweetgrass: Indigenous Wisdom, Scientific Knowledge and the Teachings of Plants">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/braiding-sweetgrass-indigenous-wisdom-scientific-knowledge-and-the-teachings-of-plants-e60737077.html"
                                            data-loc="3">
                                            <h2>Braiding Sweetgrass: Indigenous Wisdom, Scientific Knowledge and the
                                                Teachings of Plants</h2>
                                        </a>
                                        <div class="file-info" data-id="60737077">
                                            <span class="fi-pagecount ">473 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2017</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">2.03
                                                MB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">147,989 Downloads</span></span> <br />
                                        </div>
                                        Braiding_Sweetgrass_-_Robin_Kimmerer.pdf Braiding Sweetgrass &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="liad">
                        </li>
                    </ul>
                </div>
                <div class="collection-title mb-2">
                    <a href="/category/232"><i class="far fa-grin-hearts"></i> Books on Finding Your Passion and Purpose
                        in Life</a>
                </div>
                <div class="files-new">
                    <ul>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/i-am-malala-the-story-of-the-girl-who-stood-up-for-education-e14796117.html"
                                            data-id="14796117">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/969/96921e068f4aa96042ff3d9425368769-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/969/96921e068f4aa96042ff3d9425368769-s.jpg"
                                                alt="I am Malala: The Story of the Girl Who Stood Up for Education"
                                                title="I am Malala: The Story of the Girl Who Stood Up for Education">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/i-am-malala-the-story-of-the-girl-who-stood-up-for-education-e14796117.html"
                                            data-loc="1">
                                            <h2>I am Malala: The Story of the Girl Who Stood Up for Education</h2>
                                        </a>
                                        <div class="file-info" data-id="14796117">
                                            <span class="fi-pagecount ">195 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2012</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">3.04
                                                MB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">423,631 Downloads</span></span> <br />
                                        </div>
                                        along the stinky stream, past the giant billboard for Dr Humayun's Hair
                                        Transplant
                                        . O Malalai of Maiwand, .. crammed t &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/resisting-happiness-a-true-story-about-why-we-sabotage-ourselves-e39563520.html"
                                            data-id="39563520">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/bf9/bf93b21ca6f860b22862fb495157ee5e-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/bf9/bf93b21ca6f860b22862fb495157ee5e-s.jpg"
                                                alt="Resisting Happiness: A True Story about Why We Sabotage Ourselves"
                                                title="Resisting Happiness: A True Story about Why We Sabotage Ourselves">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/resisting-happiness-a-true-story-about-why-we-sabotage-ourselves-e39563520.html"
                                            data-loc="2">
                                            <h2>Resisting Happiness: A True Story about Why We Sabotage Ourselves</h2>
                                        </a>
                                        <div class="file-info" data-id="39563520">
                                            <span class="fi-pagecount ">32 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2017</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">258
                                                KB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">457,247 Downloads</span></span> <br />
                                        </div>
                                        so you can become the-best-version-of-yourself and start living with This study
                                        guide is designed to accompany Dynamic &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/the-purpose-driven-life-what-on-earth-am-i-here-for-e185720921.html"
                                            data-id="185720921">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/f09/f093c203496024043455817fd7a7ef3f-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/f09/f093c203496024043455817fd7a7ef3f-s.jpg"
                                                alt="The Purpose-Driven Life: What on Earth Am I Here For?"
                                                title="The Purpose-Driven Life: What on Earth Am I Here For?">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/the-purpose-driven-life-what-on-earth-am-i-here-for-e185720921.html"
                                            data-loc="3">
                                            <h2>The Purpose-Driven Life: What on Earth Am I Here For?</h2>
                                        </a>
                                        <div class="file-info" data-id="185720921">
                                            <span class="fi-year ">2003</span><span class="ml-1 mr-1">·</span><span
                                                class="fi-size hidemobile">3.65 MB</span><span
                                                class="ml-1 mr-1 hidemobile">·</span><span class="fi-hit">369,079
                                                Downloads</span></span><span class="ml-1 mr-1">·</span><span
                                                class="new">New!</span> <br />
                                        </div>
                                        The #1 New York Times Bestseller, with over 3 million sold, now available in a
                                        large print edition The Purpose Driven Li &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/start-where-you-are-a-guide-to-compassionate-living-e60375000.html"
                                            data-id="60375000">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/f0f/f0f41178adda35d162a59e04ae087c74-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/f0f/f0f41178adda35d162a59e04ae087c74-s.jpg"
                                                alt="Start Where You Are: A Guide to Compassionate Living"
                                                title="Start Where You Are: A Guide to Compassionate Living">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/start-where-you-are-a-guide-to-compassionate-living-e60375000.html"
                                            data-loc="4">
                                            <h2>Start Where You Are: A Guide to Compassionate Living</h2>
                                        </a>
                                        <div class="file-info" data-id="60375000">
                                            <span class="fi-pagecount ">242 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2007</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">1022
                                                KB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">259,606 Downloads</span></span> <br />
                                        </div>
                                        Pema_Chödrön_Start_Where_You_Are_A_Guide_to_C(zlibraryexau2g3p_onion).pdf
                                        Start Where You Are &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="liad">
                        </li>
                    </ul>
                </div>
                <div class="collection-title mb-2">
                    <a href="/category/253"><i class="far fa-compass"></i> Parenting Books to Raise Grateful, Healthy &
                        Happy Childen</a>
                </div>
                <div class="files-new">
                    <ul>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/no-drama-discipline-the-whole-brain-way-to-calm-the-chaos-and-nurture-your-childs-developing-mind-e60737124.html"
                                            data-id="60737124">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/8b3/8b39526b4c12048aecea13ece6340e82-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/8b3/8b39526b4c12048aecea13ece6340e82-s.jpg"
                                                alt="No-Drama Discipline: The Whole-Brain Way to Calm the Chaos and Nurture Your Child's Developing Mind"
                                                title="No-Drama Discipline: The Whole-Brain Way to Calm the Chaos and Nurture Your Child's Developing Mind">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/no-drama-discipline-the-whole-brain-way-to-calm-the-chaos-and-nurture-your-childs-developing-mind-e60737124.html"
                                            data-loc="1">
                                            <h2>No-Drama Discipline: The Whole-Brain Way to Calm the Chaos and Nurture
                                                Your Child's Developing Mind</h2>
                                        </a>
                                        <div class="file-info" data-id="60737124">
                                            <span class="fi-pagecount ">345 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2017</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">13.27
                                                MB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">177,873 Downloads</span></span> <br />
                                        </div>
                                        No-Drama_Discipline_-_Daniel_J__Siegel.pdf No-Drama Discipline &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/1-2-3-magic-3-step-discipline-for-calm-effective-and-happy-parenting-e60737129.html"
                                            data-id="60737129">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/d5f/d5f323efe9f69a5974290387dd621bf0-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/d5f/d5f323efe9f69a5974290387dd621bf0-s.jpg"
                                                alt="1-2-3 Magic: 3-Step Discipline for Calm, Effective, and Happy Parenting"
                                                title="1-2-3 Magic: 3-Step Discipline for Calm, Effective, and Happy Parenting">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/1-2-3-magic-3-step-discipline-for-calm-effective-and-happy-parenting-e60737129.html"
                                            data-loc="2">
                                            <h2>1-2-3 Magic: 3-Step Discipline for Calm, Effective, and Happy Parenting
                                            </h2>
                                        </a>
                                        <div class="file-info" data-id="60737129">
                                            <span class="fi-pagecount ">322 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2017</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">6.23
                                                MB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">161,678 Downloads</span></span> <br />
                                        </div>
                                        1-2-3_Magic__3-Step_Discipline_for_Calm,_E_-_Thomas_W__Phelan.pdf 1-2-3 Magic:
                                        3-Step Discipline for Calm, Effective, an &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/the-explosive-child-a-new-approach-for-understanding-and-parenting-easily-frustrated-chronically-i-e60737125.html"
                                            data-id="60737125">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/9bd/9bd7628990a72a420d1fda917a2d6912-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/9bd/9bd7628990a72a420d1fda917a2d6912-s.jpg"
                                                alt="The Explosive Child: A New Approach for Understanding and Parenting Easily Frustrated, Chronically I"
                                                title="The Explosive Child: A New Approach for Understanding and Parenting Easily Frustrated, Chronically I">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/the-explosive-child-a-new-approach-for-understanding-and-parenting-easily-frustrated-chronically-i-e60737125.html"
                                            data-loc="3">
                                            <h2>The Explosive Child: A New Approach for Understanding and Parenting
                                                Easily Frustrated, Chronically I</h2>
                                        </a>
                                        <div class="file-info" data-id="60737125">
                                            <span class="fi-pagecount ">318 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2010</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">714
                                                KB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">75,621 Downloads</span></span> <br />
                                        </div>
                                        Ross_W__Greene_The_Explosive_Child_A_New_Approa(zlibraryexau2g3p_onion).pdf
                                        &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="liad">
                        </li>
                    </ul>
                </div>
                <div class="collection-title mb-2">
                    <a href="/category/211"><i class="fas fa-dove"></i> Books That Will Help You Love and Accept
                        Yourself</a>
                </div>
                <div class="files-new">
                    <ul>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/the-gifts-of-imperfection-embrace-who-you-are-e60365102.html"
                                            data-id="60365102">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/8a5/8a57e63db9422e1ebac221fe091f7505-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/8a5/8a57e63db9422e1ebac221fe091f7505-s.jpg"
                                                alt="The Gifts of Imperfection: Embrace Who You Are"
                                                title="The Gifts of Imperfection: Embrace Who You Are">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/the-gifts-of-imperfection-embrace-who-you-are-e60365102.html"
                                            data-loc="1">
                                            <h2>The Gifts of Imperfection: Embrace Who You Are</h2>
                                        </a>
                                        <div class="file-info" data-id="60365102">
                                            <span class="fi-pagecount ">98 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2015</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">1.1
                                                MB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">408,098 Downloads</span></span> <br />
                                        </div>
                                        Brene_Brown_The_Gifts_of_Imperfection_Let_Go_of(zlibraryexau2g3p_onion).pdf The
                                        Gifts of Imperfection: Let Go of Who You &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/the-choice-embrace-the-possible-e61378075.html" data-id="61378075">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/d8a/d8a2d988cf491e9155be046d47b60319-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/d8a/d8a2d988cf491e9155be046d47b60319-s.jpg"
                                                alt="The Choice: Embrace the Possible"
                                                title="The Choice: Embrace the Possible">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/the-choice-embrace-the-possible-e61378075.html" data-loc="2">
                                            <h2>The Choice: Embrace the Possible</h2>
                                        </a>
                                        <div class="file-info" data-id="61378075">
                                            <span class="fi-pagecount ">359 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2017</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">1.99
                                                MB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">103,802 Downloads</span></span> <br />
                                        </div>
                                        The_Choice_-_Edith_Eva_Eger.pdf The Choice &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="collection-title mb-2">
                    <a href="/category/176"><i class="fab fa-gripfire"></i> Best Motivational Books to Take Charge of
                        Your Life</a>
                </div>
                <div class="files-new">
                    <ul>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/boundaries-when-to-say-yes-how-to-say-no-to-take-control-of-your-life-e60363043.html"
                                            data-id="60363043">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/436/4363a573dce18de6452986dcee9e54eb-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/436/4363a573dce18de6452986dcee9e54eb-s.jpg"
                                                alt="Boundaries: When to Say Yes, How to Say No to Take Control of Your Life"
                                                title="Boundaries: When to Say Yes, How to Say No to Take Control of Your Life">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/boundaries-when-to-say-yes-how-to-say-no-to-take-control-of-your-life-e60363043.html"
                                            data-loc="1">
                                            <h2>Boundaries: When to Say Yes, How to Say No to Take Control of Your Life
                                            </h2>
                                        </a>
                                        <div class="file-info" data-id="60363043">
                                            <span class="fi-pagecount ">357 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2001</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">1.9
                                                MB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">565,797 Downloads</span></span> <br />
                                        </div>
                                        Dr__Henry_Cloud,_Dr__John_Townsend_Boundaries_W(zlibraryexau2g3p_onion).pdf
                                        Boundaries Henry Cloud &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/the-5-second-rule-transform-your-life-work-and-confidence-with-everyday-courage-e60374999.html"
                                            data-id="60374999">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/52c/52cd4079b54f1fbcb5d6bc581a73618b-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/52c/52cd4079b54f1fbcb5d6bc581a73618b-s.jpg"
                                                alt="The 5 Second Rule: Transform your Life, Work, and Confidence with Everyday Courage"
                                                title="The 5 Second Rule: Transform your Life, Work, and Confidence with Everyday Courage">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/the-5-second-rule-transform-your-life-work-and-confidence-with-everyday-courage-e60374999.html"
                                            data-loc="2">
                                            <h2>The 5 Second Rule: Transform your Life, Work, and Confidence with
                                                Everyday Courage</h2>
                                        </a>
                                        <div class="file-info" data-id="60374999">
                                            <span class="fi-pagecount ">252 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2017</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">11.94
                                                MB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">894,760 Downloads</span></span> <br />
                                        </div>
                                        Mel_Robbins_The_5_Second_Rule_Transform_your_Li(zlibraryexau2g3p_onion).pdf The
                                        5 Second Rule: Transform Your Life, Work &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-sm ">
                                    <div class="file-left">
                                        <a href="/the-daily-stoic-366-meditations-on-wisdom-perseverance-and-the-art-of-living-e61378067.html"
                                            data-id="61378067">
                                            <img class="img-zoom file-img"
                                                src="https://cdn.asaha.com/assets/thumbs/8d2/8d24bb902a2301e24766a6b00df41f14-s.jpg"
                                                data-original="https://cdn.asaha.com/assets/thumbs/8d2/8d24bb902a2301e24766a6b00df41f14-s.jpg"
                                                alt="The Daily Stoic: 366 Meditations on Wisdom, Perseverance, and the Art of Living"
                                                title="The Daily Stoic: 366 Meditations on Wisdom, Perseverance, and the Art of Living">
                                        </a>
                                    </div>
                                    <div class="file-right">
                                        <a href="/the-daily-stoic-366-meditations-on-wisdom-perseverance-and-the-art-of-living-e61378067.html"
                                            data-loc="3">
                                            <h2>The Daily Stoic: 366 Meditations on Wisdom, Perseverance, and the Art of
                                                Living</h2>
                                        </a>
                                        <div class="file-info" data-id="61378067">
                                            <span class="fi-pagecount ">406 Pages</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-year ">2017</span><span
                                                class="ml-1 mr-1">·</span><span class="fi-size hidemobile">2.6
                                                MB</span><span class="ml-1 mr-1 hidemobile">·</span><span
                                                class="fi-hit">345,863 Downloads</span></span> <br />
                                        </div>
                                        Hanselman,_Stephen_Holiday,_Ryan_The_daily_stoi(zlibraryexau2g3p_onion).pdf The
                                        Daily Stoic &nbsp;...
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="files-new">
                    <ul>
                    </ul>
                </div>
                <div class="loadmore">
                    <div class="moreButton" id="moreButton"
                        onclick="loadMore(5, 'daily'); ga('send', 'event', 'Load more similar files homepage');">
                        <i class="fa fa-chevron-circle-down" aria-hidden="true"
                            style="color: #2d96c3; margin-right: 8px;"></i> Load more files
                    </div>
                </div>
                <div id="js_image_selection" class="horizontal-scrollable-tabs mt-3">
                    <div class="p-3" style="font-weight: 700;color: #4A4848;font-size: 23px;">Educational Videos</div>
                    <div class="scroller arrow-left"><i class="fas fa-chevron-circle-left"></i></div>
                    <div class="scroller arrow-right"><i class="fas fa-chevron-circle-right"></i></div>
                    <div class="horizontal-tabs">
                        <ul role="tablist" class="nav-tabs nav-tabs-horizontal">
                            <li role="presentation">
                                <a href="#n6sTlukHLiA" data-id="190" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/n6sTlukHLiA/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    The One Thing Only 1% of People Do </div>
                            </li>
                            <li role="presentation">
                                <a href="#UF8uR6Z6KLc" data-id="57" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/UF8uR6Z6KLc/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    Steve Jobs' 2005 Stanford Commencement Address </div>
                            </li>
                            <li role="presentation">
                                <a href="#j01Hg4QJ6NE" data-id="176" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/j01Hg4QJ6NE/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    Best Friend - Animation Short Film </div>
                            </li>
                            <li role="presentation">
                                <a href="#wTblbYqQQag" data-id="113" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/wTblbYqQQag/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    Jim Carrey - What It All Means </div>
                            </li>
                            <li role="presentation">
                                <a href="#1aLeYLRrW3U" data-id="141" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/1aLeYLRrW3U/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    If We Love | Short Film </div>
                            </li>
                            <li role="presentation">
                                <a href="#mRqR4mOC4gc" data-id="211" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/mRqR4mOC4gc/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    Anxiety - Short Film </div>
                            </li>
                            <li role="presentation">
                                <a href="#eOUWgtbIhgE" data-id="43" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/eOUWgtbIhgE/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    The War on Consciousness - Graham Hancock </div>
                            </li>
                            <li role="presentation">
                                <a href="#kak8PEl_v1I" data-id="183" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/kak8PEl_v1I/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    Listen to this before you start your day! </div>
                            </li>
                            <li role="presentation">
                                <a href="#PudZNM276CY" data-id="204" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/PudZNM276CY/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    Money, happiness and eternal life - Greed </div>
                            </li>
                            <li role="presentation">
                                <a href="#7bB_fVDlvhc" data-id="134" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/7bB_fVDlvhc/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    Why I read a book a day (and why you should too) </div>
                            </li>
                            <li role="presentation">
                                <a href="#sp6mRYzjqCE" data-id="218" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/sp6mRYzjqCE/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    Practice This For a Few MINUTES Each day </div>
                            </li>
                            <li role="presentation">
                                <a href="#FcMa9n0WteA" data-id="197" data-toggle="tab" class="yt-video-link"><img
                                        src="https://img.youtube.com/vi/FcMa9n0WteA/mqdefault.jpg" /></a>
                                <div class="yt-video-title">
                                    This company tested out a 4-day workweek. </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div class="yt-video-container" role="tabpanel" class="tab-pane active" style="display:none;">
                        <iframe src="" class="yt-video" type="text/html" frameborder="0" border="0"
                            webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
                    </div>
                </div>
            </div>
            <div class="dialog-right">
                <div id="user-menu-right"></div>
                <div style="font-size:14px;" class="mr-1 mb-2"><i class="fab fa-hotjar"></i>
                    <a href="/request-a-book" style="font-weight: 500;"
                        onclick="ga('send', 'event', 'hope-promo', 'maincats');">CS60APA:hope</a> Give away. Free Building materials
                    books you want.</a>
                </div>
                <div id="recommended"></div>
                <div id="ebook-reviews"></div>
                <div class="box" id="categories">
                    <div class="categories-list">
                        <ul>
                            <li>
                                <a href="/categories/113.html">
                                    <img class="img-polaroid" src="materials/113.jpg,q1.pagespeed.ce.mkYymIWWrJ.jpg" alt="Editor's Picks" title="Editor's Picks" />
                                    <p>Editor's Picks</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/112.html">
                                    <img class="img-polaroid" src="materials/112.jpg,q1.pagespeed.ce.Xe6gOhTcER.jpg" alt="Most Popular" title="Most Popular" />
                                    <p>Most Popular</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/6.html">
                                    <img class="img-polaroid" src="materials/6.jpg,q1.pagespeed.ce.faGoLXw_Zo.jpg" alt="Academic & Education" title="Academic & Education" />
                                    <p>Academic & Education</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/1.html">
                                    <img class="img-polaroid" src="materials/1.jpg,q1.pagespeed.ce.-rhdJZ7irU.jpg" alt="Art" title="Art" />
                                    <p>Art</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/16.html">
                                    <img class="img-polaroid" src="materials/16.jpg,q1.pagespeed.ce.zwzmmHmCkd.jpg" alt="Biography" title="Biography" />
                                    <p>Biography</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/3.html">
                                    <img class="img-polaroid" src="materials/3.jpg,q1.pagespeed.ce.aSeZkTbnd7.jpg" alt="Business & Career" title="Business & Career" />
                                    <p>Business & Career</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/17.html">
                                    <img class="img-polaroid" src="materials/17.jpg,q1.pagespeed.ce.bADb2_dTk7.jpg" alt="Children & Youth" title="Children & Youth" />
                                    <p>Children & Youth</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/18.html">
                                    <img class="img-polaroid" src="materials/18.jpg,q1.pagespeed.ce.vjPjtEIVKT.jpg" alt="Environment" title="Environment" />
                                    <p>Environment</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/11.html">
                                    <img class="img-polaroid" src="materials/11.jpg,q1.pagespeed.ce.DGFb-dl2_M.jpg" alt="Fiction & Literature" title="Fiction & Literature" />
                                    <p>Fiction & Literature</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/8.html">
                                    <img class="img-polaroid" src="materials/8.jpg,q1.pagespeed.ce.OuzH2mMuOP.jpg" alt="Health & Fitness" title="Health & Fitness" />
                                    <p>Health & Fitness</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/19.html">
                                    <img class="img-polaroid" src="materials/19.jpg,q1.pagespeed.ce.HauFtH45bw.jpg" alt="Lifestyle" title="Lifestyle" />
                                    <p>Lifestyle</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/4.html">
                                    <img class="img-polaroid" src="materials/4.jpg,q1.pagespeed.ce.DJYM8KxsPA.jpg" alt="Personal Growth" title="Personal Growth" />
                                    <p>Personal Growth</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/15.html">
                                    <img class="img-polaroid" src="materials/15.jpg,q1.pagespeed.ce.C7piLVryvI.jpg" alt="Politics & Laws" title="Politics & Laws" />
                                    <p>Politics & Laws</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/10.html">
                                    <img class="img-polaroid" src="materials/10.jpg,q1.pagespeed.ce.w8ZghX1Xa9.jpg" alt="Religion" title="Religion" />
                                    <p>Religion</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/14.html">
                                    <img class="img-polaroid" src="materials/14.jpg,q1.pagespeed.ce.FOEGkoiVh7.jpg" alt="Science & Research" title="Science & Research" />
                                    <p>Science & Research</p>
                                    </a>
                                    </li>
                                    <li>
                                    <a href="/categories/5.html">
                                    <img class="img-polaroid" src="materials/5.jpg,q1.pagespeed.ce.s9tlpDKaed.jpg" alt="Technology" title="Technology" />
                                    <p>Technology</p>
                                    </a>
                            </li>
                        </ul>
                    </div>
                    <form class="form-inline hidemobile" onsubmit="validate('cats'); return false;">
                        <span id="subscribe-heading">Get Top Trending Free Books in Your Inbox</span>
                        <div id="subscribebox-cats">
                            <div class="input-group input-group-sm" style="width: 350px;height: 40px;">
                                <input type="text" autocomplete="on" name="email" required value="" class="form-control"
                                    id="email-cats" placeholder="Enter your email">
                                <span class="input-group-btn">
                                    <button type="submit" class="btn btn-danger subscribe-btn">Subscribe</button>
                                </span>
                            </div>
                        </div>
                    </form>
                    <div class="quotes">“ You miss 100% of the shots you don’t take. ” ― <strong>Wayne Gretzky</strong>
                    </div>
                </div>
                <div class="quotes mb-2" id="ask-yourself"><strong><i class="fas fa-question-circle"></i> Ask
                        yourself:</strong> What has my heart and intuition been telling me that I might be ignoring? <a
                        href="javascript:askYourself();" id="ask-yourself-next">Next</a></div>
                <div>
                    <a href="/app"><img alt="" title="PDF Drive App"
                            src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
                            style="width: 170px; margin-left: -10px;" /></a>
                </div>
                <div class="mt-3 mb-3">
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

                    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7910112472671819"
                        data-ad-slot="3127563976" data-ad-format="auto" data-full-width-responsive="true"></ins>
                    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                </div>
            </div>
            <div style="clear:both;"></div>
        </div>
        <div class="modal fade" id="pdfdriveAlerts" tabindex="-1" role="dialog" aria-labelledby="pdfdriveAlerts">
            <div class="modal-dialog" role="document">
                <div class="modal-content alerts-content">
                    <div class="modal-body alerts-body mb-4">
                        <img class="alerts-img" id="pdfdriveAlertsImg" alt="free e-books">
                        <i class="fas fa-times"
                            style="position: absolute;top: 0px;right: 0px;padding: 9px;color: #fff;cursor:pointer;"
                            onclick="$('#pdfdriveAlerts').modal('hide')"></i>
                        <form class="form-inline pt-1" onsubmit="validate('alerts'); return false;">
                            <div class="alerts-heading">Get Top Trending Free Books in Your Inbox</div>
                            <div id="subscribebox-alerts" style="margin: 0px auto;">
                                <div class="input-group input-group-sm" style="height: 40px; margin: 0px auto;">
                                    <input type="text" autocomplete="on" name="email" required value=""
                                        class="alerts-email form-control" id="email-alerts"
                                        placeholder="Enter your email">
                                    <span class="input-group-btn">
                                        <button type="submit" class="btn btn-danger subscribe-btn">Subscribe</button>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer" id="footer">
            <div class="footer-section" style="text-align: center;" id="footer-logo">
                <a href="/home.html"><h3>CS60apa Inc</h3>
                    <!--<img src="/assets/evelyn.svg" width="175" border="0"
                        title="PDF Search Engine" alt="Evelyn Software Research" style="padding-top: 45px;" />-->
                </a>
            </div>
            <div class="footer-section">
                <div class="footer-title" title="0.0127 / 15-10-2021 03:59:43 / 195.201.87.181">
                    Company </div> <br />
                <a href="/about.html" rel="nofollow">About</a><br />
                <a href="">Mobile App</a><br />
                <a href="/terms.html" rel="nofollow">Terms & Privacy</a><br />
            </div>
            <div class="footer-section">
                <div class="footer-title">Social</div><br />
                <a href="https://twitter.com/Alisikaundi" target="_blank">Twitter</a><br />
                <a href="https://www.facebook.com/cs60apa" target="_blank">Facebook</a><br />
                <a href="/donate.html">Donate ♥</a><br />
            </div>
            <div class="footer-section">
                <div class="footer-title">Help</div><br />
                <a href="" rel="nofollow">Contact us</a><br />
                <a href="" rel="nofollow">Feedback</a><br />
                <a href="/copyright.html" rel="nofollow">DMCA & Copyright</a><br />
            </div>
            <div style="clear:both"></div>
        </div>
    </div>
    <script src="/js/javascript.js" type="text/javascript"></script>
    <script src="/js/file.js" ></script>
    <script
        type="text/javascript">function toggleMSearch() { if ($("#m-search-form").is(":visible")) { if ($("#m-q").val() == "") { $('#m-search-form').hide(); $('#m-search-icon').removeClass('fa-times-circle'); $('#m-search-icon').addClass('fa-seach'); $('#btnLangMobile').show(); history.replaceState(null, null, window.location.href); } else { $("#m-q").val(''); $('#m-q').focus(); } } else { $('#m-search-form').show(); $('#m-search-icon').removeClass('fa-seach'); $('#m-search-icon').addClass('fa-times-circle'); $('#btnLangMobile').hide(); $('#logo').removeClass(); $('#m-q').focus(); window.history.pushState({ page: 1 }, "", ""); } } function sendToAndroid(toast) { if (typeof Android !== "undefined" && Android !== null) { Android.showToast(toast); } } var loadingSmilars = 0; function loadMore(start, orderby) { if (orderby == undefined) orderby = ''; if (loadingSmilars == 1) return; loadingSmilars = 1; $(".loadmore:last").html('<center><i class="fa fa-sync-alt fa-spin-custom"></i></center>'); $.get('/home/index?s=' + start + '&ajax=1&a=1&p=' + orderby, function (data) { $(".loadmore:last").html(data); $(".img-zoom").hoverIntent({ over: makeLarge, out: makeSmall }); $('[data-toggle="popover"]').popover(); activateLastLoaded(); }); loadingSmilars = 0; } function activateLastLoaded() { $(".img-zoom").hoverIntent({ over: makeLarge, out: makeSmall }); initTooltips(); aiSimilar(); $('[data-toggle="popover"]').popover(); } function mobileMenu() { $(".mobile-nav-button .mobile-nav-button__line:nth-of-type(1)").toggleClass("mobile-nav-button__line--1"); $(".mobile-nav-button .mobile-nav-button__line:nth-of-type(2)").toggleClass("mobile-nav-button__line--2"); $(".mobile-nav-button .mobile-nav-button__line:nth-of-type(3)").toggleClass("mobile-nav-button__line--3"); $('.mobile-menu').toggleClass('mobile-menu--open'); window.history.pushState({ page: 1 }, "", ""); } $(document).ready(function () { $("#lightSlider, #lightSliderbottom").lightSlider({ autoWidth: true, slideMove: 3, slideMargin: 10, addClass: '', mode: "slide", useCSS: true, cssEasing: 'ease', easing: 'linear', speed: 600, auto: true, loop: true, slideEndAnimation: true, pause: 1500, pauseOnHover: true, keyPress: false, controls: false, prevHtml: '', nextHtml: '', rtl: false, adaptiveHeight: false, vertical: false, verticalHeight: 500, vThumbWidth: 100, thumbItem: 10, pager: false, gallery: false, galleryMargin: 15, thumbMargin: 5, currentPagerPosition: 'middle', enableTouch: true, enableDrag: true, freeMove: true, swipeThreshold: 40, responsive: [], onBeforeStart: function (el) { }, onSliderLoad: function (el) { }, onBeforeSlide: function (el) { }, onAfterSlide: function (el) { }, onBeforeNextSlide: function (el) { }, onBeforePrevSlide: function (el) { } }); }); $(document).ready(function () {
                if (window.innerWidth <= 1174) { $('#user-menu-header').html($('#user-menu-right').html()); $('#user-menu-inner').addClass('pull-right'); $('#user-menu-right').html(''); } var animations = ['pulse', 'rubberBand', 'flip', 'tada', '', 'jello', 'bounceInLeft', 'flip', 'flip', 'lightSpeedIn', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']; var randomAnimation = animations[Math.floor(Math.random() * animations.length)]; $('#logo').addClass('animated ' + randomAnimation); $.fn.horizontalTabs = function () { var $elem = $(this), widthOfReducedList = $elem.find('.nav-tabs-horizontal').width(), widthOfList = 0, currentPos = 0, adjustScroll = function () { widthOfList = 0; $elem.find('.nav-tabs-horizontal li').each(function (index, item) { widthOfList += $(item).width(); }); widthAvailale = $elem.width(); if (widthOfList > widthAvailale) { $elem.find('.scroller').show(); updateArrowStyle(currentPos); widthOfReducedList = $elem.find('.nav-tabs-horizontal').width(); } else { $elem.find('.scroller').hide(); } }, scrollLeft = function () { $elem.find('.nav-tabs-horizontal').animate({ scrollLeft: currentPos - widthOfReducedList }, 500); if (currentPos - widthOfReducedList > 0) { currentPos -= widthOfReducedList; } else { currentPos = 0; } }, scrollRight = function () { $elem.find('.nav-tabs-horizontal').animate({ scrollLeft: currentPos + widthOfReducedList }, 500); if ((currentPos + widthOfReducedList) < (widthOfList - widthOfReducedList)) { currentPos += widthOfReducedList; } else { currentPos = (widthOfList - widthOfReducedList); } }, manualScroll = function () { currentPos = $elem.find('.nav-tabs-horizontal').scrollLeft(); updateArrowStyle(currentPos); }, updateArrowStyle = function (position) { if (position >= (widthOfList - widthOfReducedList)) { $elem.find('.arrow-right').addClass('disabled'); } else { $elem.find('.arrow-right').removeClass('disabled'); }; if (position <= 0) { $elem.find('.arrow-left').addClass('disabled'); } else { $elem.find('.arrow-left').removeClass('disabled'); }; }; $(window).resize(function () { adjustScroll(); }); $elem.find('.arrow-left').on('click.horizontalTabs', function () { scrollLeft(); }); $elem.find('.arrow-right').on('click.horizontalTabs', function () { scrollRight(); }); $elem.find('.nav-tabs-horizontal').scroll(function () { manualScroll(); }); adjustScroll(); return this; }
                $("#js_image_selection").horizontalTabs(); $(".yt-video-link").click(function (e) { $('.yt-video-container').hide(); $('.yt-video').attr('src', 'https://www.youtube.com/embed/' + $(this).attr('href').substring(1) + '?autoplay=1'); $('.yt-video-container').show(); $.post("/Category/videoHit", { id: $(this).attr('data-id') }).done(function (data) { }); }); $('.mobile-nav-button, .mobile-link').on('click', function (e) { e.preventDefault(); $(".mobile-nav-button .mobile-nav-button__line:nth-of-type(1)").toggleClass("mobile-nav-button__line--1"); $(".mobile-nav-button .mobile-nav-button__line:nth-of-type(2)").toggleClass("mobile-nav-button__line--2"); $(".mobile-nav-button .mobile-nav-button__line:nth-of-type(3)").toggleClass("mobile-nav-button__line--3"); if ($(this).hasClass('mobile-link')) { setTimeout("location.replace('" + $(this).attr('href') + "')", 650); setTimeout("$('.mobile-menu').toggleClass('mobile-menu--open')", 350); } else { $('.mobile-menu').toggleClass('mobile-menu--open'); window.history.pushState({ page: 1 }, "", ""); } }); if ("ontouchstart" in document.documentElement) { $(".dialog").on('click', function (e) { if ($('.mobile-menu').hasClass('mobile-menu--open')) { mobileMenu(); e.preventDefault(); } }); } $('#q').autocomplete({ serviceUrl: '/search/complete', triggerSelectOnValidInput: false, preventBadQueries: false, onSelect: function (suggestion) { $("#search-form").submit(); } }); $('#m-q').autocomplete({ serviceUrl: '/search/complete', triggerSelectOnValidInput: false, onSelect: function (suggestion) { $('#q').val($('#m-q').val()); $("#search-form").submit(); } }); $("#m-search-form").submit(function (event) { $('#q').val($('#m-q').val()); $("#search-form").submit(); event.preventDefault(); }); $("#m-q").focus(function () { window.scrollTo(0, 0); }); activateLastLoaded(); window.onbeforeunload = function () { $({ property: 0 }).animate({ property: 105 }, { duration: 3000, step: function () { var _percent = Math.round(this.property); $('#progress').css('width', _percent + "%"); if (_percent == 105) { $("#progress").addClass("done"); } } }); };
            });</script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js"
        integrity="sha384-feJI7QwhOS+hwpX2zkaeJQjeiwlhOP+SdQDqhgvvo1DsjtiSQByFdThsxO669S2D"
        crossorigin="anonymous"></script>
</body>

</html>