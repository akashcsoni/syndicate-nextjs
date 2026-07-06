"use client";

import themeConfig, { BACKEND_URL } from "@/config/themeConfig";
import { getData } from "@/utils/Api";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [SearchOpenClose, setSearchOpenClose] = useState(false);
  const [MenuOpenClose, setMenuOpenClose] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [header, setHeader] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  let Header_Type = "Header_Type_Three";

  if (pathname === "/") {
    Header_Type = "Header_Type_One";
  } else if (pathname === "/home-two") {
    Header_Type = "Header_Type_Two";
  } else if (pathname === "/home-three") {
    Header_Type = "Header_Type_Three";
  }

  useEffect(() => {
    // Function to handle the scroll event
    let handleScroll = {};
    if (router.asPath === "/about-us") {
      handleScroll = () => {
        if (window.scrollY > 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
    } else {
      handleScroll = () => {
        if (window.scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
    }

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.asPath]); // Empty dependency array means this effect runs once after initial render

  useEffect(() => {
    const getHeaderData = async () => {
      try {
        const data = await getData(themeConfig.api.header_url);
        setHeader(data);
      } catch (error) {
        console.log(error);
      }
    };
    getHeaderData();
  }, []);

  useEffect(() => {
    const toggleBtn = document.querySelector(".toggle-menu-button a");
    const closeBtn = document.querySelector(".menu-close a");
    const mobileMenu = document.querySelector(".mobile-menu");

    const openMenu = (e) => {
      e.preventDefault();
      mobileMenu?.classList.add("active");
    };

    const closeMenu = (e) => {
      e.preventDefault();
      mobileMenu?.classList.remove("active");
    };

    toggleBtn?.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);

    return () => {
      toggleBtn?.removeEventListener("click", openMenu);
      closeBtn?.removeEventListener("click", closeMenu);
    };
  }, []);

  const headerClasses = isScrolled ? "sticky" : "";

  const active_slug_class = (slug) => {
    return pathname === slug || pathname.startsWith(`${slug}/`) ? "active" : "";
  };

  useEffect(() => {
    if (SearchOpenClose) {
      document.body.classList.add("search-active");
    } else {
      document.body.classList.remove("search-active");
    }
  }, [SearchOpenClose]);

  const Search_Form = (e) => {
    e.preventDefault();

    const formElement = document.querySelector(`#search-forms`);
    const formData = new FormData(formElement);

    let search = formData.get("search");

    if (search && search.trim() !== "") {
      const queryParam = encodeURIComponent(search.trim().toLowerCase());
      router.push(`/search?query=${queryParam}`);
      setSearchOpenClose(false);
    }
  };

  const type = "Header_Type_Three";

  if (type === "Header_Type_One") {
    return (
      <>
        <div className="search-popup">
          <Link
            href="/"
            className="close-search"
            onClick={(e) => {
              e.preventDefault();
              setSearchOpenClose(!SearchOpenClose);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <form onSubmit={Search_Form} id="search-forms">
            <div className="form-group">
              <input
                type="search"
                name="search-field"
                placeholder="Search Here..."
                required=""
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
        <header className={`header ${headerClasses}`}>
          {/* <!-- start header top bar --> */}
          <div className="header-top-bar">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-6 col-sm-8">
                  <p className="d-none d-md-flex">
                    {header?.Phone_Title}{" "}
                    <Link
                      href={`tel:${header?.Phone_Value?.replace(/\s+/g, "")}`}
                    >
                      {header?.Phone_Value}
                    </Link>{" "}
                    {header?.Email_Title}{" "}
                    <Link
                      href={`mailto:${header?.Email_Value?.replace(
                        /\s+/g,
                        ""
                      )}`}
                    >
                      {header?.Email_Value}
                    </Link>
                  </p>
                  <p className="d-flex d-md-none">
                    <Link
                      href={`tel:${header?.Phone_Value?.replace(/\s+/g, "")}`}
                    >
                      <i className="fa-solid fa-phone"></i>
                    </Link>{" "}
                    <Link
                      href={`mailto:${header?.Email_Value?.replace(
                        /\s+/g,
                        ""
                      )}`}
                    >
                      <i className="fa-solid fa-envelope"></i>
                    </Link>
                  </p>
                </div>
                <div className="col-6 col-sm-4">
                  {/* <!-- header social link --> */}
                  <ul className="header-social d-flex align-items-center justify-content-end gap-3">
                    {header?.Social_Icon?.map((icon) => {
                      return (
                        <li key={icon.id}>
                          <Link href="#">
                            <i className={`fa-brands ${icon.Icon_Name}`}></i>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end header top bar --> */}

          {/* <!-- start header main navigation --> */}
          <div className="main-navigation">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-6 col-md-4 col-lg-2 pe-0">
                  {/* <!-- Site logo --> */}
                  <div className="logo-img">
                    {header?.Logo_Dark_Img?.url && (
                      <Link href="/">
                        <Image
                          src={`${BACKEND_URL}${header?.Logo_Dark_Img?.url}`}
                          alt="logo"
                          width={234}
                          height={66}
                        />
                      </Link>
                    )}{" "}
                  </div>
                </div>
                <div className="col-1 col-md-4 col-lg-8">
                  {/* <!-- Start Header nav Menu Bar --> */}
                  <nav className="mainmenu-nav d-none d-lg-block">
                    <ul className="main-menu">
                      {header?.Menu_Items &&
                        header?.Menu_Items.map((menu_data, index) => {
                          let MenuHtml = (
                            <li
                              key={index}
                              className={`${active_slug_class(menu_data.Link)}`} //dropdown active
                            >
                              <Link href={menu_data.Link}>
                                {menu_data.Title}
                              </Link>
                            </li>
                          );
                          if (menu_data.Sub_Menu.length > 0) {
                            MenuHtml = (
                              <li
                                className={`dropdown ${active_slug_class(
                                  menu_data.Link
                                )}`}
                                key={index}
                              >
                                <Link href={menu_data.Link}>
                                  {menu_data.Title}
                                </Link>
                                <ul className="dropdown-menu fade-down">
                                  {menu_data.Sub_Menu &&
                                    menu_data.Sub_Menu.map(
                                      (sub_menu_data, index) => {
                                        return (
                                          <li
                                            className={active_slug_class(
                                              sub_menu_data.Link
                                            )}
                                            key={index}
                                          >
                                            <Link href={sub_menu_data.Link}>
                                              {sub_menu_data.Title}
                                            </Link>
                                          </li>
                                        );
                                      }
                                    )}
                                </ul>
                              </li>
                            );
                          }
                          return MenuHtml;
                        })}
                    </ul>
                  </nav>
                  {/* <!-- End Header nav Menu Bar --> */}
                </div>
                <div className="col-5 col-md-4 col-lg-2">
                  <div className="header-right">
                    {/* <!-- Start search icon --> */}

                    <div className="search-icon">
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSearchOpenClose(!SearchOpenClose);
                        }}
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Link>
                    </div>
                    {/* <!-- End search icon --> */}

                    {/* <!-- Start mobile toggle icon --> */}
                    <div className="toggle-menu-button">
                      <Link
                        href="#"
                        className=""
                        onClick={(e) => {
                          e.preventDefault();
                          setMenuOpenClose(!MenuOpenClose);
                        }}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </Link>
                    </div>
                    {/* <!-- End mobile toggle icon --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end header main navigation --> */}
          {/* <!-- Mobile menu --> */}

          <div className={`mobile-menu ${MenuOpenClose ? "open" : ""}`}>
            <div className="menu-close">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpenClose(false); // Close on click
                }}
              >
                {" "}
                <Image
                  src="/assets/images/close-menu.svg"
                  alt="close-menu"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
            <ul className="main-menu">
              {header?.Menu_Items &&
                header?.Menu_Items.map((menu_data, index) => {
                  let MenuHtml = (
                    <li
                      key={index}
                      className={`dropdown${active_slug_class(menu_data.Link)}`} //dropdown active
                    >
                      <Link href={menu_data.Link}>{menu_data.Title}</Link>
                    </li>
                  );
                  if (menu_data.Sub_Menu.length > 0) {
                    MenuHtml = (
                      <li
                        className={`dropdown${active_slug_class(
                          menu_data.Link
                        )}`}
                        key={index}
                      >
                        <Link href={menu_data.Link}>{menu_data.Title}</Link>
                        <ul className="dropdown-menu fade-down">
                          {menu_data.Sub_Menu &&
                            menu_data.Sub_Menu.map((sub_menu_data, index) => {
                              return (
                                <li
                                  className={active_slug_class(
                                    sub_menu_data.Link
                                  )}
                                  key={index}
                                >
                                  <Link href={sub_menu_data.Link}>
                                    {sub_menu_data.Title}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    );
                  }
                  return MenuHtml;
                })}
            </ul>
          </div>
          {/* <!-- End Mobile menu --> */}
        </header>
      </>
    );
  }

  if (type === "Header_Type_Two") {
    return (
      <>
        <div className="search-popup">
          <Link
            href="/"
            className="close-search"
            onClick={(e) => {
              e.preventDefault();
              setSearchOpenClose(!SearchOpenClose);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <form onSubmit={Search_Form} id="search-forms">
            <div className="form-group">
              <input
                type="search"
                name="search-field"
                placeholder="Search Here..."
                required=""
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
        <header className={`header-style-2 ${headerClasses}`}>
          {/* <!-- start header top bar --> */}
          <div className="header-style-2-top">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-4 col-md-4">
                  {/* <!-- header top left --> */}
                  <div className="header-style-2-left">
                    {/* <!-- Start search icon --> */}
                    <div className="search-icon">
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSearchOpenClose(!SearchOpenClose);
                        }}
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Link>
                    </div>
                    {/* <!-- End search icon --> */}
                    {/* <!-- email link --> */}
                    <p className="d-none d-md-flex">
                      {header?.Email_Title}{" "}
                      <Link
                        href={`mailto:${header?.Email_Value?.replace(
                          /\s+/g,
                          ""
                        )}`}
                      >
                        {" "}
                        {header?.Email_Value}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-4 col-md-4">
                  {/* <!-- Site logo --> */}
                  <div className="logo-img">
                    <Link href="/">
                      {header?.Logo_Image?.url && (
                        <Image
                          src={`${BACKEND_URL}${header?.Logo_Image?.url}`}
                          alt="logo"
                          width={234}
                          height={66}
                        />
                      )}
                      {header?.Logo_Dark_Image?.url && (
                        <Image
                          src={`${BACKEND_URL}${header?.Logo_Dark_Image?.url}`}
                          alt="logo"
                          width={234}
                          height={66}
                        />
                      )}
                    </Link>
                  </div>
                </div>
                <div className="col-4 col-md-4">
                  {/* <!-- header social link --> */}
                  <ul className="header-social d-flex align-items-center justify-content-end gap-2 gap-sm-3">
                    {header?.Social_Icon?.map((icon) => {
                      return (
                        <li key={icon.id}>
                          <Link href="#">
                            <i className={`fa-brands ${icon.Icon_Name}`}></i>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end header top bar --> */}
          {/* <!-- start header main navigation --> */}
          <div className="navigation-style-2">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12">
                  {/* <!-- Start Header nav Menu Bar --> */}
                  <nav className="mainmenu-style-2">
                    {/* <!-- Start mobile toggle icon --> */}
                    <div className="toggle-menu-button">
                      <Link
                        href="#"
                        className=""
                        onClick={(e) => {
                          e.preventDefault();
                          setMenuOpenClose(!MenuOpenClose);
                        }}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </Link>
                    </div>

                    <ul className="main-menu d-none d-lg-flex">
                      {/* {header?.Menu_Items &&
                        header?.Menu_Items.map((menu_data, index) => {
                          let MenuHtml = (
                            <li
                              key={index}
                              className={`dropdown ${active_slug_class(
                                menu_data.Link
                              )}`} //dropdown active
                            >
                              <Link href={menu_data.Link}>
                                {menu_data.Title}
                              </Link>
                            </li>
                          );
                          if (menu_data?.Sub_Menu?.length > 0) {
                            MenuHtml = (
                              <li
                                className={`dropdown ${active_slug_class(
                                  menu_data.Link
                                )}`}
                                key={index}
                              >
                                <Link href={menu_data.Link}>
                                  {menu_data.Title}
                                </Link>
                                <ul className="dropdown-menu fade-down">
                                  {menu_data.Sub_Menu &&
                                    menu_data.Sub_Menu.map(
                                      (sub_menu_data, index) => {
                                        return (
                                          <li
                                            className={active_slug_class(
                                              sub_menu_data.Link
                                            )}
                                            key={index}
                                          >
                                            <Link href={sub_menu_data.Link}>
                                              {sub_menu_data.Title}
                                            </Link>
                                          </li>
                                        );
                                      }
                                    )}
                                </ul>
                              </li>
                            );
                          }
                          return MenuHtml;
                        })} */}
                      {header?.Menu_Items &&
                        header?.Menu_Items.map((menu_data, index) => {
                          return (
                            <li
                              key={index}
                              // className={`dropdown ${active_slug_class(
                              //   menu_data.Link
                              // )}`} //dropdown active
                            >
                              <Link href={menu_data.Link}>
                                {menu_data.Title}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                    {/* <!-- header coll us --> */}
                    <div className="phoneline-style-2">
                      <Link
                        href={`tel:${header?.Phone_Value?.replace(/\s+/g, "")}`}
                      >
                        <span className="icon">
                          <i className="fa-solid fa-phone"></i>
                        </span>
                        {header?.Phone_Value}
                        <span className="phone-title">
                          {header?.Phone_Title}
                        </span>
                      </Link>
                    </div>
                  </nav>
                  {/* <!-- End Header nav Menu Bar --> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end header top bar --> */}
          {/* <!-- Mobile menu --> */}
          <div className={`mobile-menu ${MenuOpenClose ? "open" : ""}`}>
            <div className="menu-close">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpenClose(!MenuOpenClose);
                }}
              >
                <Image
                  src="/assets/images/close-menu.svg"
                  alt="close-menu"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
            <ul className="main-menu">
              {header?.Menu_Items &&
                header?.Menu_Items.map((menu_data, index) => {
                  let MenuHtml = (
                    <li
                      key={index}
                      className={active_slug_class(menu_data.Link)} //dropdown active
                    >
                      <Link href={menu_data.Link}>{menu_data.Title}</Link>
                    </li>
                  );
                  if (menu_data.Sub_Menu.length > 0) {
                    MenuHtml = (
                      <li
                        className={`dropdown ${active_slug_class(
                          menu_data.Link
                        )}`}
                        key={index}
                      >
                        <Link href={menu_data.Link}>{menu_data.Title}</Link>
                        <ul className="dropdown-menu fade-down">
                          {menu_data.Sub_Menu &&
                            menu_data.Sub_Menu.map((sub_menu_data, index) => {
                              return (
                                <li
                                  className={active_slug_class(
                                    sub_menu_data.Link
                                  )}
                                  key={index}
                                >
                                  <Link href={sub_menu_data.Link}>
                                    {sub_menu_data.Title}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    );
                  }
                  return MenuHtml;
                })}
            </ul>
          </div>
          {/* <!-- End Mobile menu --> */}
        </header>
      </>
    );
  }

  if (type === "Header_Type_Three") {
    return (
      <>
        <div className="search-popup">
          <Link
            href="/"
            className="close-search"
            onClick={(e) => {
              e.preventDefault();
              setSearchOpenClose(!SearchOpenClose);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <form onSubmit={Search_Form} id="search-forms">
            <div className="form-group">
              <input
                type="search"
                name="search-field"
                placeholder="Search Here..."
                required=""
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
        <header className={`header header-style-3 ${headerClasses}`}>
          <div className="main-navigation">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-6 col-md-4">
                  <div className="logo-img">
                    {header?.Logo_Image?.url && (
                      <Link href="/">
                        <Image
                          src={`${BACKEND_URL}${header?.Logo_Image?.url}`}
                          alt="logo"
                          width={234}
                          height={66}
                        />
                      </Link>
                    )}{" "}
                  </div>
                </div>
                <div className="col-6 col-md-8">
                  <div className="header-right">
                    <nav className="mainmenu-nav d-none d-lg-block">
                      <ul className="main-menu">
                        {header?.Menu_Items &&
                          header?.Menu_Items.map((menu_data, index) => {
                            let MenuHtml = (
                              <li
                                key={index}
                                className={active_slug_class(menu_data.Link)} //dropdown active
                              >
                                <Link href={menu_data.Link}>
                                  {menu_data.Title}
                                </Link>
                              </li>
                            );
                            if (menu_data.Sub_Menu.length > 0) {
                              MenuHtml = (
                                <li
                                  className={`dropdown ${active_slug_class(
                                    menu_data.Link
                                  )}`}
                                  key={index}
                                >
                                  <Link href={menu_data.Link}>
                                    {menu_data.Title}
                                  </Link>
                                  <ul className="dropdown-menu fade-down">
                                    {menu_data.Sub_Menu &&
                                      menu_data.Sub_Menu.map(
                                        (sub_menu_data, index) => {
                                          return (
                                            <li
                                              className={active_slug_class(
                                                sub_menu_data.Link
                                              )}
                                              key={index}
                                            >
                                              <Link href={sub_menu_data.Link}>
                                                {sub_menu_data.Title}
                                              </Link>
                                            </li>
                                          );
                                        }
                                      )}
                                  </ul>
                                </li>
                              );
                            }
                            return MenuHtml;
                          })}
                      </ul>
                    </nav>

                    <div className="toggle-menu-button">
                      <Link
                        href="#"
                        className=""
                        onClick={(e) => {
                          e.preventDefault();
                          setMenuOpenClose(!MenuOpenClose);
                        }}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </Link>
                    </div>

                    <div className="search-icon">
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSearchOpenClose(!SearchOpenClose);
                        }}
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`mobile-menu ${MenuOpenClose ? "open" : ""}`}>
            <div className="menu-close">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpenClose(!MenuOpenClose);
                }}
              >
                <Image
                  src="/assets/images/close-menu.svg"
                  alt="close-menu"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
            <ul className="main-menu">
              {header?.Menu_Items &&
                header?.Menu_Items.map((menu_data, index) => {
                  let MenuHtml = (
                    <li
                      key={index}
                      className={active_slug_class(menu_data.Link)}
                    >
                      <Link
                        href={menu_data.Link}
                        onClick={() => setMenuOpenClose(!MenuOpenClose)}
                      >
                        {menu_data.Title}
                      </Link>
                    </li>
                  );
                  if (menu_data.Sub_Menu.length > 0) {
                    MenuHtml = (
                      <li
                        className={`dropdown ${active_slug_class(
                          menu_data.Link
                        )}`}
                        key={index}
                      >
                        <Link href={menu_data.Link}>{menu_data.Title}</Link>
                        <ul className="dropdown-menu fade-down">
                          {menu_data.Sub_Menu &&
                            menu_data.Sub_Menu.map((sub_menu_data, index) => {
                              return (
                                <li
                                  className={active_slug_class(
                                    sub_menu_data.Link
                                  )}
                                  key={index}
                                >
                                  <Link
                                    href={sub_menu_data.Link}
                                    onClick={() =>
                                      setMenuOpenClose(!MenuOpenClose)
                                    }
                                  >
                                    {sub_menu_data.Title}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    );
                  }
                  return MenuHtml;
                })}
            </ul>
          </div>
        </header>
      </>
    );
  }
};

export default Header;
