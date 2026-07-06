import themeConfig from "@/config/themeConfig";
import { $api, fetchStrapiPage } from "@/utils/Api";
import { useEffect, useState } from "react";

const FreeQuote = ({ data, slug }) => {
  const [SendMail_Save_errors, setSendMail_Save_errors] = useState({});
  const [Success, setSuccess] = useState("");
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const resdata = await fetchStrapiPage(themeConfig.api.page_block_url, {
          slug: slug,
          block: data?.name,
          id: data?.id,
        });
        setQuote(resdata?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getQuote();
  }, [slug, data?.id, data?.name]);

  const Send_Mail = async (e) => {
    e.preventDefault();
    setSuccess("");

    const formElement = document.querySelector(`#send-mail`);
    const formData = new FormData(formElement);
    const email = formData.get("email");

    const error = {};

    if (!email || email.trim() === "") {
      error.email = "Email is required *";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (Object.keys(error).length > 0) {
      setSendMail_Save_errors(error);
      return;
    }

    setSendMail_Save_errors({});
    setLoading(true);

    try {
      const response = await $api.post(themeConfig.api.newsletter_url, {
        email: email,
      });

      const result = response.data;

      setSuccess(result?.message || "Subscribed successfully");

      if (!result?.alreadySubscribed) {
        formElement.reset();
      }

      // ✅ simple timeout
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error(err);
      setSuccess(
        err?.response?.data?.message || "Server error. Please try again later."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="get-free-quote-style-2 bg-tertiary">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-5">
            <h6>{quote?.Title}</h6>
            <h2>{quote?.Sub_Title}</h2>
          </div>
          <div className="col-12 col-md-7">
            <form
              className="get-free-quote-form"
              id="send-mail"
              onSubmit={Send_Mail}
            >
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email address *"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>

            {SendMail_Save_errors.email && (
              <span className="get-free-quote-form-error">
                {SendMail_Save_errors.email}
              </span>
            )}

            {Success && (
              <div className="get-free-quote-form-success" role="alert">
                <p className="success-text">{Success}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeQuote;
