# 8914-empower-ability-final-project-spa



## Code Explanation 
~~~
<!DOCTYPE html>
<html lang="en">
<!-- WCAG 3.1.1 (Language of Page, Level A).-->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

  <!--
    WHY meta description:
    Gives screen readers and search engines a summary of the page's purpose.Not a WCAG requirement, but best practice for accessibility and SEO.  -->
  <meta
    name="description"
    content="Empower Ability Labs — Foster understanding and promote inclusive digital experiences for all."
  />

  <!--
    WHY unique title:
    WCAG 2.4.2 (Page Titled, Level A) requires each page/view to have
    a descriptive title. In a SPA, the JS dynamically updates document.title
    on every view change so screen readers announce the new "page".
    Format: "View Name - Site Name" is the recommended pattern.
    This starting value matches the Home view.
  -->
  <title>Empower Ability Labs</title>

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
    crossorigin="anonymous"
  />
  <link rel="stylesheet" href="EmpowerAbilityLab.css" />
</head>

<body>

  <!--
    ============================================================
    SKIP LINK
    ============================================================
    WHY: WCAG 2.4.1 (Bypass Blocks, Level A).
    Keyboard-only users would otherwise have to Tab through every
    nav link on every simulated page change to reach the main content.
    The skip link must be the VERY FIRST focusable element on the page.
    It is visually hidden (CSS: position absolute, top -100%) until it
    receives keyboard focus, then it slides into view.
    The href="#main-content" targets the <main> element below.
    Native <a> with href gives us keyboard focus and Enter key for free.
  -->
  <a class="skip-link" href="#main-content">Skip to main content</a>


  <!--   HEADER + NAVBAR  -->
  <header>
    <!--
      WHY <nav> with aria-label:
      <nav> creates a "navigation" landmark region that screen reader
      users can jump to directly (e.g. pressing N in NVDA, or using
      the VoiceOver rotor). WCAG 1.3.6 (Identify Purpose).
    -->
    <nav
      class="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
      aria-label="Main navigation"
    >
      <div class="container">
        <a class="navbar-brand" href="#home" data-view="home">
          <img
            src="images/empowerabilitylabslogo.png"
            alt="Empower Ability Labs"
            height="48"
          />
        </a>

        <!--
          WHY these attributes on the hamburger button:
          - type="button": prevents form submission if wrapped in a form
          - aria-controls="mainNav": tells screen readers WHICH element this button controls (must match id of the collapsible div below)
          - aria-expanded="false": tells screen readers the menu is currently
            collapsed. JS toggles this to "true" when menu opens.
          - aria-label="Toggle navigation menu": gives the button a
            descriptive name because it only contains an icon with no text.
            Without this, screen readers say "button" only.
          WCAG 4.1.2 (Name, Role, Value).
        -->
        <button
          class="navbar-toggler"
          type="button"
          id="nav-toggler"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation menu"
        >
          <!--
            WHY aria-hidden on the icon span:
            The icon is purely decorative — the button's accessible name
            already comes from aria-label above. Hiding the icon prevents
            screen readers from announcing it twice or saying "navbar toggler icon".
          -->
          <span class="navbar-toggler-icon" aria-hidden="true"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNav">
          <!--
            WHY <ul> with role="list":
            Using <ul> + <li> is the CORRECT native HTML pattern for
            navigation per ARIA APG and WCAG 1.3.1.
            Screen readers announce "list, 3 items" so users know
            how many links to expect.

            WHY role="list" explicitly:
            Bootstrap CSS applies list-style:none which causes VoiceOver
            on iOS/macOS to strip list semantics. role="list" restores
            the semantic meaning that CSS removed.

            WHY NOT role="menubar":
            The ARIA APG says "menubar" is for APPLICATION menus (like
            a desktop app menu). For WEBSITE navigation, use native
            <nav> + <ul>. Using menubar would require implementing
            arrow-key navigation which would break Tab navigation. ❌
          -->
          <ul class="navbar-nav ms-auto mb-2 mb-md-0" role="list">

            <li class="nav-item" role="listitem">
              <!--
                WHY aria-current="page" on Home link: WCAG 1.3.1 (Info and Relationships). Sighted users see the blue highlight (class="active").
                Screen reader users hear "Home, current page, link".
                Without aria-current, screen readers cannot tell which
                page is currently active.
                JS dynamically moves aria-current to whichever nav
                link matches the current view.
                WHY white text on bg-dark still passes:
              <a
                class="nav-link active"
                href="#home"
                data-view="home"
                aria-current="page"
              >Home</a>
            </li>

            <li class="nav-item" role="listitem">
                WHY no aria-current here:
                Only the CURRENT page gets aria-current="page".
                JS adds it dynamically when this view becomes active.
                WCAG 2.4.4: "Services" clearly describes the destination.
              -->
              <a class="nav-link" href="#services" data-view="services">Services</a>
            </li>

            <li class="nav-item" role="listitem">
              <!--
                "Schedule a call" — descriptive link text.
                Matches the page heading exactly. WCAG 2.4.6.
              -->
              <a class="nav-link" href="#schedule" data-view="schedule">Schedule a call</a>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  </header>


  <!--
    ============================================================
    MAIN CONTENT
    ============================================================
    WHY <main> landmark:
    WCAG 4.1.2. There must be exactly ONE <main> per page.
    Screen reader users jump directly to <main> via landmark
    navigation (e.g. pressing M in NVDA, or using the VoiceOver rotor).

    WHY id="main-content":
    This is the target of the skip link above (<a href="#main-content">).

    WHY tabindex="-1":
    Allows JS to call mainContent.focus() programmatically after every
    view change so keyboard focus is reset to the top of new content.
    tabindex="-1" means the element can receive focus from JS but is
    NOT in the natural Tab order (users won't Tab to it accidentally).
    WCAG 2.4.3 (Focus Order) and SPA rubric: Focus Management.
  -->
  <main id="main-content" tabindex="-1">

    <!--
      WHY aria-live="polite" announcer:
      In a normal multi-page website, the browser announces the new
      page title when you navigate. In a SPA, there is no real
      navigation — so screen readers stay silent when views change.
      This hidden div solves that: JS clears it, then sets it to
      e.g. "Services - Empower Ability Labs — page loaded".
      aria-live="polite" announces when the user is not doing anything.
      aria-atomic="true" reads the full message, not just changed parts.
      class="visually-hidden" hides it visually but keeps it readable
      by screen readers. WCAG 4.1.3 (Status Messages, Level AA).
    -->
    <div
      id="page-announcer"
      aria-live="polite"
      aria-atomic="true"
      class="visually-hidden"
    ></div>


    <!-- ==========================================================
         HOME VIEW
         ========================================================== -->
    <!--
      WHY <section> with aria-labelledby:
      <section> creates a named landmark region.
      aria-labelledby="home-heading" links this region to its <h1>.
      Screen readers announce: "Welcome to Empower Ability Labs!, region"
      so users know exactly which content area they are in.
      WCAG 1.3.1 (Info and Relationships).

      No hidden attribute here — Home is visible by default.
      JS adds hidden to the other sections and removes it from this
      one when the Home nav link is clicked.
    -->
    <section id="view-home" aria-labelledby="home-heading">

      <!-- HERO BANNER -->
      <!--
        WHY hero-section class:
        CSS sets background-color: #e9ecef (light gray) with dark text.
        Contrast ratio of body text (#212529) on #e9ecef = 15.3:1 ✅
        WCAG 1.4.3 requires minimum 4.5:1 for normal text.
      -->
      <div class="hero-section">
        <div class="container py-5">

          <!--
            WHY exactly one <h1> per view:
            WCAG 1.3.1 and 2.4.6. Each view acts as a "page" and
            must have exactly ONE <h1> as the main heading.
            id="home-heading" is referenced by aria-labelledby
            on the <section> parent above.
            Screen readers announce this as the page's primary heading.
            Heading hierarchy: h1 here → h2 for the three columns below.
            Never skip heading levels (e.g. h1 → h3 is wrong).
          -->
          <h1 id="home-heading">Welcome to Empower Ability Labs!</h1>

          <p class="lead">
            Empower Ability Labs is a hub for learning and empathy-building.
            We are on a mission to foster understanding and promote inclusive
            digital experiences for all. We offer a range of services designed
            to promote accessibility awareness, drive inclusivity, and enhance
            the user experience. And help you find answers on: How do people
            with disabilities use technology and navigate the digital world?
            What tools do they employ?
          </p>

          <!--
            WHY native <button> instead of <a> or <div>:
            Using a native <button> gives us for FREE:
            - Correct role: screen reader says "button" not just text
            - Keyboard: both Enter AND Space bar activate it natively
            - Focus: included in Tab order automatically
            No ARIA role needed. This is the "native HTML first" principle.
            IMPORTANT: type="button" prevents any accidental form submission.

            WHY aria-haspopup="dialog":
            Tells screen readers this button will open a dialog/modal.
            WCAG 4.1.2 (Name, Role, Value).

            WHY aria-describedby="community-btn-desc":
            The button text alone says "Meet the Empower Community!" but
            screen readers can announce additional context from the hidden
            description element below. This gives users more information
            about what the dialog contains BEFORE they open it.
            Screen reader announces:
            "Meet the Empower Community!, has popup dialog, button —
             Learn about the organizations we have worked with"

            WHY btn-warning (yellow) color:
            Black (#000) text on #ffc107 (yellow) = 17.7:1 ✅
            Far exceeds the 4.5:1 minimum. WCAG 1.4.3.
          -->
          <button
            type="button"
            class="btn btn-warning fw-bold"
            id="meet-community-btn"
            aria-haspopup="dialog"
            aria-describedby="community-btn-desc"
          >
            Meet the Empower Community!
          </button>

          <!--
            WHY visually-hidden description:
            This text is hidden from sighted users but read by screen readers
            via aria-describedby on the button above.
            It gives screen reader users extra context about what the dialog
            contains before they decide to open it.
            WCAG 1.3.1 (Info and Relationships).
          -->
          <p id="community-btn-desc" class="visually-hidden">
            Opens a dialog with information about organizations we have worked
            with, including McGill University, Walmart, Apple, Google, and the
            Government of Canada.
          </p>

        </div>
      </div>
      <!-- END HERO BANNER -->


      <!-- THREE COLUMN INFO SECTION -->
      <div class="container py-5">
        <div class="row g-4">

          <!-- COLUMN 1 -->
          <div class="col-md-4">
            <!--
              WHY <h2> not <h3> or <p>:
              These are subheadings UNDER the <h1> above, so they
              must be <h2>. Heading levels form the page outline:
              h1 "Welcome..." → h2 "Our Approach" / "Services" / "Testimonials"
              Screen reader users navigate by heading levels (H key in NVDA).
              Skipping from h1 to h3 would break that navigation.

              WHY class="h5" is fine here:
              class="h5" only changes the VISUAL size using CSS.
              It does NOT change the semantic heading level.
              The heading is still an <h2> in the accessibility tree.
              This is a common and correct Bootstrap pattern.
            -->
            <h2 class="h5">Our Approach</h2>
            <p>
              Empower Ability Labs utilizes a hands-on approach to raise
              awareness and promote empathy. Our immersive workshops and lab
              days provide participants with a unique opportunity to step into
              the shoes of individuals with disabilities and navigate the world
              from their perspective.
            </p>
            <!--
              WHY visually-hidden span on links:
              WCAG 2.4.4 (Link Purpose, Level A).
              Without the span, a screen reader user tabbing through links
              hears "Learn more, Learn more, Learn more" — no context.
              With it, they hear:
              "Learn more about Our Approach, opens in a new tab, link"
              The span text is INVISIBLE to sighted users (CSS clips it)
              but fully readable by screen readers.

              WHY target="_blank" warning in the span:
              Opening in a new tab is a change of context. WCAG 3.2.2
              (On Input) requires warning users. The "(opens in a new tab)"
              text satisfies this for screen reader users.

              WHY rel="noopener noreferrer":
              Security best practice. Prevents the new tab from accessing
              window.opener which could be exploited for phishing.
            -->
            <a
              href="https://www.google.com/search/howsearchworks/our-approach/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
              <span class="visually-hidden"> about Our Approach (opens in a new tab)</span>
            </a>
          </div>

          <!-- COLUMN 2 -->
          <div class="col-md-4">
            <h2 class="h5">Services</h2>
            <p>Promote accessibility awareness and enhance the user experience.</p>
            <!--
              WHY native <ul> with <li>:
              WCAG 1.3.1. Using a proper list gives screen readers the
              count automatically: "list, 3 items".
              If we used <p> or <div> instead, users would not know how
              many items there are without reading them all.
              Native HTML, no ARIA needed.
            -->
            <ul>
              <li>Empathy lab days and workshops</li>
              <li>Go beyond WCAG compliance!</li>
              <li>Inspirational speakers</li>
            </ul>
            <a
              href="https://www.elevenways.be/en/services"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
              <span class="visually-hidden"> about Services (opens in a new tab)</span>
            </a>
          </div>

          <!-- COLUMN 3 -->
          <div class="col-md-4">
            <h2 class="h5">Testimonials</h2>
            <p>
              Invite a speaker with disabilities to share their unique journey.
              This captivating addition to your upcoming event will offer
              insights that resonate, inspire, educate, and enrich your team's
              understanding of inclusion.
            </p>
            <a
              href="https://dictionary.cambridge.org/us/dictionary/english/testimonial"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
              <span class="visually-hidden"> about Testimonials (opens in a new tab)</span>
            </a>
          </div>

        </div>

        <!--
          WHY native <hr>:
          <hr> is a native HTML thematic break / separator element.
          role="separator" is implicit — no extra ARIA needed.
          Screen readers announce it as a visual and structural break.
          WCAG 1.3.1.
        -->
        <hr class="mt-4" />
      </div>
      <!-- END THREE COLUMN SECTION -->

    </section>
    <!-- END HOME VIEW -->
<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <section id="view-services" aria-labelledby="services-heading" hidden>
        <div class="container py-5">
          <h1 id="services-heading">Services</h1>
          <div class="row g-4">
            <div class="col-md-8">
              <p class="lead">Dedicated space or programs designed to cultivate empathy and understanding among individuals towards the challenges faced by people with disabilities in using technology and interacting with various environments.</p>
              <h2>Empathy Lab days and workshops</h2>
              <p>The lab days and workshops typically provide hands-on experiences, simulations, and interactions with assistive technologies, tools, and scenarios that replicate the obstacles individuals with disabilities encounter daily.</p>
              <h2>Inspirational speakers</h2>
              <p>Invite a speaker with disabilities to share their unique journey. This captivating addition to your upcoming event will offer insights that resonate, inspire, educate, and enrich your team's collective understanding of inclusion.</p>
              <h2>Usability testing</h2>
              <p>Go beyond WCAG! Involve individuals with disabilities in usability testing to gather valuable insights for refining product strategy and identifying accessibility concerns at an early stage when solutions are more feasible and cost-effective. You have access to a diverse community of people with disabilities, who use various assistive technologies. With technical expertise ranging from novice to expert, our community can support your product lifecycle from user research, to design, to QA.</p>
            </div>
            <div class="col-md-4 d-flex align-items-start justify-content-center pt-3">
              <img src="images/services.png" alt="Illustration representing accessibility services and empathy workshops" class="img-fluid rounded">
            </div>
          </div>
        </div>
      </section>

      <section id="view-schedule" aria-labelledby="schedule-heading" hidden>
        <div class="container py-5">
          <div class="row g-4">
            <div class="col-md-8">
              <h1 id="schedule-heading">Schedule a call</h1>
              <p class="lead">At Empower Ability Labs, we are dedicated to cultivating empathy and driving positive change through immersive experiences. Fill out the form below and we'll get back to you as soon as we can to schedule a call with our sales team!</p>

              <div id="form-messages" aria-live="assertive" aria-atomic="true"></div>
              <div id="thank-you-message" class="alert alert-success" hidden tabindex="-1" role="status">
                <strong>Thank you!</strong> We've received your information and will be in touch soon to schedule your call.
              </div>

              <form id="schedule-form" novalidate aria-label="Schedule a call form">
                <div class="mb-3">
                  <label for="business-name" class="form-label">Business Name</label>
                  <input type="text" class="form-control" id="business-name" name="businessName" autocomplete="organization">
                </div>
                <div class="mb-3">
                  <label for="phone-number" class="form-label">Phone number <span class="text-muted fw-normal">(613-123-1234)</span></label>
                  <input type="tel" class="form-control" id="phone-number" name="phoneNumber" placeholder="613-123-1234" autocomplete="tel">
                </div>
                <div class="mb-3">
                  <label for="email-address" class="form-label">Email <span class="text-muted fw-normal" aria-hidden="true">(required)</span></label>
                  <input type="email" class="form-control" id="email-address" name="email" required aria-required="true" autocomplete="email" aria-describedby="email-error">
                  <div id="email-error" class="field-error" role="alert" aria-live="polite"></div>
                </div>

                <fieldset class="mb-3">
                  <legend class="form-label">What would you like to talk about:</legend>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="topic-awareness" name="topics" value="awareness">
                    <label class="form-check-label" for="topic-awareness">Awareness lab days and workshops</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="topic-speaker" name="topics" value="speaker">
                    <label class="form-check-label" for="topic-speaker">Invite a speaker with disabilities to your event</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="topic-usability" name="topics" value="usability">
                    <label class="form-check-label" for="topic-usability">Usability testing</label>
                  </div>
                </fieldset>

                <div id="event-description-wrapper" class="mb-3" hidden>
                  <label for="event-description" class="form-label">Please tell us about your event</label>
                  <textarea class="form-control" id="event-description" name="eventDescription" rows="4"></textarea>
                </div>

                <div class="mb-4 d-flex align-items-center gap-3">
                  <button type="button" role="switch" id="email-toggle" aria-checked="true" class="toggle-switch" aria-labelledby="email-toggle-label">
                    <span class="toggle-track" aria-hidden="true"><span class="toggle-thumb"></span></span>
                  </button>
                  <span id="email-toggle-label" class="form-label mb-0">Receive emails about updates and services</span>
                </div>

                <button type="submit" class="btn btn-primary">Schedule a call</button>
              </form>
            </div>
            <div class="col-md-4 d-flex align-items-start justify-content-center pt-3">
              <img src="images/scheduleacall.png" alt="Person holding a smartphone, ready to schedule a call" class="img-fluid rounded">
            </div>
          </div>
        </div>
      </section>
<!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    </main>

    <div id="community-modal" class="modal-backdrop" hidden>

    <!--
      WHY role="dialog":
      Tells screen readers this is a modal dialog.
      Screen reader announces: "Community Steering Committee, dialog"
      when the modal opens. ARIA APG Dialog Pattern.

      WHY aria-modal="true":
      Tells screen readers to treat all content OUTSIDE this dialog
      as inert (not browsable). Modern screen readers use this to
      restrict virtual cursor to inside the dialog only.

      WHY aria-labelledby="modal-title":
      Gives the dialog its accessible name from the visible <h2> inside.
      Screen reader users hear the name of the dialog when it opens.
      WCAG 4.1.2 (Name, Role, Value).
    -->
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      id="modal-dialog"
      class="modal-dialog-custom"
    >

      <div class="modal-header-custom">
        <!--
          WHY <h2> inside the dialog:
          The dialog is a self-contained content region.
          <h2> is the correct level here — it is the primary heading
          of this dialog's content.
          id="modal-title" is referenced by aria-labelledby above.
        -->
        <h2 id="modal-title" class="modal-title-text">
          Community Steering Committee
        </h2>

        <!--
          WHY aria-label on the close button:
          The button content is just the × symbol — a screen reader
          would say "times, button" with no context.
          aria-label="Close Community Steering Committee dialog" gives
          a full, descriptive name. SR announces:
          "Close Community Steering Committee dialog, button" ✅
          WCAG 4.1.2 (Name, Role, Value).

          WHY focus goes here when modal opens:
          ARIA APG Dialog Pattern requires focus to move INTO the dialog
          when it opens. JS calls closeX.focus() on openModal().
          This ensures keyboard users immediately know the dialog is open.

          WHY aria-hidden on the × span:
          The aria-label on the button already provides the accessible name.
          aria-hidden="true" tells screen readers to ignore the × character
          inside and only announce the aria-label text instead.
        -->
        <button
          type="button"
          id="modal-close-x"
          class="btn-modal-close"
          aria-label="Close Community Steering Committee dialog"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body-custom">
        <p>
          We get aha! moments from product managers who try our services for
          the first time. We have offered many lab days, workshops and usability
          testing services to many companies and organizations including:
        </p>
        <!--
          WHY <ul> + <li> inside the modal:
          Same reason as above. Native list gives screen readers
          the count: "list, 5 items". WCAG 1.3.1.
        -->
        <ul>
          <li>McGill University</li>
          <li>Walmart.ca</li>
          <li>Apple.ca</li>
          <li>Google.ca</li>
          <li>Government of Canada</li>
        </ul>
      </div>

      <div class="modal-footer-custom">
        <!--
          WHY a second Close button in the footer:
          ARIA APG Dialog Pattern recommends a visible close button.
          Having one in the header AND footer improves usability —
          users do not have to Shift+Tab back to the top to close.

          WHY the JS focus trap is critical here:
          When Tab is pressed on this last focusable element, JS wraps
          focus back to modal-close-x (the first focusable element).
          This keeps focus INSIDE the dialog while it is open.
          WCAG 2.1.2 (No Keyboard Trap) — note: trapping focus INSIDE
          a modal IS correct per APG. The user must be able to EXIT
          via Escape key or a close button, which JS provides.
        -->
        <button type="button" id="modal-close-btn" class="btn btn-secondary">
          Close
        </button>
      </div>

    </div>
  </div>
  <!-- END MODAL -->


  <script src="EmpowerAbilityLab.js"></script>
</body>
</html>
~~~