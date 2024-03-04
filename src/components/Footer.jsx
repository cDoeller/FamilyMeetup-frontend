import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-ironhack-container">
        <div className="footer-ironhack-logo-container">
          <a href="#">
            <img
              className="footer-ironhack-logo-image"
              src="https://schools.studentfinance.com/wp-content/uploads/2022/04/LogoBN300.png"
              alt=""
            />
          </a>
        </div>
        <div className="footer-project-by-part-of-wrapper">
          <h3 className="footer-project-by">
            A project by Natalia Pinto and Christian Doeller
          </h3>
          <h3 className="footer-project-by">As part of the IronHack Fullstack Bootcamp 2024</h3>
        </div>
      </div>
      <div className="footer-follow-container">
        <div className="footer-social-media-logos">
          <div className="footer-social-media-logo-container">
            <a href="#">
              <img
                className="footer-social-media-logo-image"
                src="data:image/png;base64,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"
                alt="x"
              />
            </a>
          </div>
          <div className="footer-social-media-logo-container">
            <a href="#">
              <img
                className="footer-social-media-logo-image"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEUYd/L///8TdfIAcvLy9/4afPP2+v4tgvMAcPKdwfkAbvHo8P2MtfeCsPcAc/IaevKpyPqixPnc6v291fvQ4vxcmvW20fr0+f/X5vyUu/jk7v1oofZVl/Xt9f7K3vyuzPqFsvc9ifRGjvRqo/ZQk/UxhPN6q/fC2ft7rPd7VzhJAAALOklEQVR4nN3daXuquhYA4JAIRrTBAZxQW6to//8vPAG1BWVIsrKIZ69v9z6nu7wNZM4K8XqJ1XgeHxbLz2ken8vFIZ6PV/38aoL7zw/Wi9FPcvQpD8OQ/0X+v6h/TH5Gi/Ue9xHQhMF2sUmPREoYpYSS15D/L2XSSo7pZrENsB4ERbhaz05HwrmgdbIXKRWck+NpFqO8t/aF82maCUVclSmG6XRu/XksC+PJN5E6LVyJKTj5nsR2H8mmMP7KGNcsu9eyZCz7sIm0JhyPMlmngHS/SsazzdbWg9kRBouEczu8O5KHu4Wd6tWGcLzJQmGRd0eGw83YwtPBhesfYrX4SkZOLmvnwjiVz4EXTKQHp8I4EZZql6agQiQwI0Q4T4Vx06djZAnkXTUX7i+sB9/NyC/m3XNTYbARSPVLrZGxjWnbYSi8Zj36CiPPFj0Kx6eefYUxTI36OSbCacR69+XBolkvwm2C2QC2B9/pj660hVPfTQHeQkRTZOEqdfAFVoKnA0xh7LQAb8EivT6OlnAUOi7AImi4QRKu0tA17h6hzpuqLpx/u6tDn4Mf1XuqysKrb3+Qax7CV+7hqAqnPfWyVYMK1dZfUTh5nzf0EfzLpvDyLnVMOfjJntBhP60t+E5lRKUgXO3cN/P1wc8KrUa3cHB+zxLMg5+7x/6dwncGKhG7hMFbA1Ve1C7h7r2BObGjuukQJu9ayfwF30GEl3cvwTw62sVW4eQdG/rX4B+mwun/oQTz4G191Bbh9Z0GE+0hWkYazcK5/16jibagfvN4sVG4+v7/FKEsxGNjs9goPPX1Eea7acK/4Jzp7lTJg6e6wlEf1Wi+F8w/XzbTxfUQx/Hhel1+zjYf6TmLin1hTIPaOD3VIIzRgZRxPxkdml6uYLxezD6SLGKqE7RhwyRjvXCFXcswnn0dVEZ3wfaQqD0Ljer/WvXCFLezxqOTxqzul2KNwBJ1IWpTT7k/0Vom+1D9c9c3/HXCLeY7yuhEc8VaWUiiupWpOiHigIKGifb6mLpQ1A0zaoSI7ygVn7o+HWHte/oqHEdoQH40WafWEBLy+gtehSe0d5SnRvspdIQ19emL8Ir2jrYP4+wICX8ZZTwLgwyrHlWdhYcJ6fD5PXkWbrCKMDQsQU0h4ZN24R5riYnXdzjsCyl72pT6JMSaeqJH8w2/ekLCniamqsI51l5KAThloCkkvDrerwoTpHF9qL0LBiAU1Q+iIoyRvkJh/hEaCAmrDFwqwhRraga0W1tbWO2eloVYRWjcEhoKiSgXYlmINe71YYcKDITlr6IkXAMP9DTFSxuMLqSi9FmUhD84bSGlwAM++kLCLnXCMYIuD6G2ZcKqsPxX/RNi9UibZvkwheUv41cYDJGO9gyBQCNhaYjxK1wgzQFD6xkzIQmXL8IdUo80BJ+WNBLS87NwjDUujKBAMyEJH3XNQzhCEorGNaGWCMphKPz9Oh5CrMkLrjWqGC+/kuPQ96NS+Ga/+LeGuwtjtMkL9U73anrMMy3Y6lk9Wqm78AupS0oj5SwCs8juPnn2UxFivaT0W9G3PdturR5N4k0YY80CP0+aNMUa4SjVfSB8E6JtcuZqRyNQVrvYV0n4jTYNrLQSE6Ds+6DHP+G8NruKjeBXFSFOp5/S9a8Qbz2NqzQWWKtdt7W2Qog2A0WEyugXa9x2m8zIhSu01RhKFKZogiNWUzXc34VrvP1dDTtAKoH361l8F87wlrV9BSFiLTC6C094ZegrdNouaIvOxcCGIH4HRK0Mscbe8kPMgkK4RWsNlYSIf2CaL3lJ4QJxB5SKEGkKLA++LIRoC9vEvXBSCPHae+fCvM2XQsSKxrUwr2qIN0CsaJwLyV4K15jbgR0LCY+lEGuyuwjnwqUUYs2UFuFcuJHCH8wdz66F4iKFihvFzcK1kJ6lELOxcC/MpNBw1lwtXAtJ5JEV0v6EWzgXsgFBW1Yrwrkw3JI56vkf98I1wT3h5F54IId/W8ivBHP8+w7CJVn+48JP8vmPC6cE90i6e+HMgpDy5qAKQj9s+Qc48PH4CC6ku9moMWYKW/RbfjwPWK/ShlBxmdc0Bm8gBG9ca401bPgqv0NwXYosBLZmsi4Ft4fIQuB8tWwPwX0aZCFwZUr2aa7Qfimy8AxrLfkCPrbAFQZD2NPJsQV4fIgr3AJPucjxIXiMjys8AB9PjvHB8zS4QmhzzfbwuTZcoWpSjKaIAvh8Ka4QeCKymC+FznnjCoGbmYo5b+i6BaoQurhZrFtA155QhdDFzWLtCbp+iCoEP9zSwhowqhD6goX5GvAe+KqjCoEb0m7r+NDmAlUI3J5924sB3U+DKgTuHr7vp4GOMRGF0E7zfU8UcAyMKYQuqtz3tQH3JmIKgZNIj72JwO2PmELgcazH/lJglYwpBG6ufewRBu7zxhQClzR+93nH71qGK+AURnG2qzhvAfpTIQrnwMbi97wFrM1HFALbsb8zM7DJEEQhsN9dfIYWzq4hCmGVfPnsGqiDyz724+ZQcDT+7B7W777nF7NxhlQ0h8K5p2DY9MPACSR2y4Fn4xwwbQ4lYeNPA4Xlc8BoZ7kd7lSonuU2zMzQHQ6FjzxDyDkVHAp5NacC1mvqTvicFwPr8JM74Utuky3OFkV3wvCRixI5x5Az4WuOIaSjM86ENXmicH6RM6H/musLp65xJazL14aTc8+RsD7nHsqpcUfCclqccu5LhPSlboRUlJLEVfKX2j8Q7EbYlL/UO9gvRDdCVs6KU8kjbD8VtBNhcx5h72A9nbcTYTWxEXI+bxfCp5tKqsK16uVKquFCyKvZNp/z6ltuEx0I2/PqW78boX8h5U+pqZDvt+hf2HW/he07SnoX0uFzVqOXe2bsntbrXfg3LmwU2s0937dQ5a4gb2szA17vZfh6UwjynV09C2/raZ1Cb2evZ9OvUJxr/v064dzee9pzGdbloUS+/7BXYd07in6HZZ9CnTssvUFk6bf2Wob1N0c23CVrKw9Bj8KwId1t033AGzvE/oS69wHLT9FKbdObsOEjbBMOjjZaxb6ENGu8vrX5bvW1jRzbPQlpZHC3uhxlWCjEfoSUvYwolIQ2su/2I6xv6hWE4KNxPQn5T9u/3yr0TlBiH0Lefg1Ku9DbAYk9CHndgEJdGJxhRHwh++5ILtIh9FYwIrqQfXfdY94l9PYgIrawG9gthBGRhQpABaE3ABBxhVwBqCL0AvMaFVXIzyqXDKsIAe0iprCjHdQTeh+GRDwhbe/JaAu9mdmiFJqQira+qInQW/gmQw0sIY1aRhOGQm99NHhTkYQsU7/OTV3oDVL9uRscIU8UWgkDYT49pfswKMLGSSe40DvoXo+GIGSR0i1ZhkJvkOh9jPaFWm+ogTC/plCnTrUtFGSm+8DaQm+u04ezLORn/Xvo9YWyGIny12hVyIhqK18OE6G3TVQrVYtCGiavS9gKYSSUPZyh2v4wa0LKh8q9mGoYCr1gw1Q2MtoSMj5RvrL1KUyFnjc+8e5a1Y5Q8JPKYdT6MBfKnmrCukYcNoSC7SB3e0OEso+TdJxlBQupEDu9PsxzwITSmIq27xEopEwkB+ATQoXyXb3Q5noVJmT0BL573oJQNo+TYVP7CBDS0J+o3GLaFTaE8imX57C2IE2FlIfnpcpMWnfYEXpFQfLXL9JISBkfToz6L3VhTSjj8DOU3QAKElLK2PACrV3KYVMon/bwdSS81IBoCgWnx4+DnbfzEXaFeaxn6ZBJJdUSUio4GyaztV2ehyGUMYhHaSa4ZKpljcj/0ywdHTRH72qBIswjmC8nSaZUhlkyWc6tl90j0IRFBCqlskfDFYErfIf4DxhZwSCCTQn4AAAAAElFTkSuQmCC"
                alt="fb"
              />
            </a>
          </div>
          <div className="footer-social-media-logo-container">
            <a href="#">
              <img
                className="footer-social-media-logo-image"
                src="data:image/jpeg;base64,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"
                alt="insta"
              />
            </a>
          </div>
          <div className="footer-social-media-logo-container">
            <a href="#">
              <img
                className="footer-social-media-logo-image"
                src="data:image/png;base64,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"
                alt="linked"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        {/* <p className="footer-copyright">© Natalia Pinto & Christian Doeller</p> */}
        <ul>
          <a href="#">
            <li>FAQ</li>
          </a>
          <a href="#">
            <li>Data</li>
          </a>
          <a href="#">
            <li>Preferences</li>
          </a>
          <a href="#">
            <li>Cookies</li>
          </a>
          <a href="#">
            <li>Help</li>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
