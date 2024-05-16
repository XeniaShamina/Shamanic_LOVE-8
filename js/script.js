document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const targetOffset = target.offsetTop - 50;
        const initialOffset = window.pageYOffset;
        const distance = targetOffset - initialOffset;
        const duration = 1000;

        let start = null;
        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          window.scrollTo(
            0,
            initialOffset + ease(progress, duration, distance)
          );
          if (progress < duration) {
            requestAnimationFrame(step);
          }
        }

        requestAnimationFrame(step);

        function ease(t, d, distance) {
          t /= d / 2;
          if (t < 1) return (distance / 2) * t * t;
          t--;
          return (-distance / 2) * (t * (t - 2) - 1);
        }
      }
    });
  });
});
