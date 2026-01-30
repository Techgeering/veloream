  document.addEventListener("DOMContentLoaded", () => {
    const paginatedTabs = [
      { tabId: "pills-all", cardContainerId: "cardContainer-all", paginationId: "paginationControls-all", cardsPerPage: 9 },
      { tabId: "pills-very", cardContainerId: "cardContainer-bently", paginationId: "paginationControls-bently", cardsPerPage: 6 },
      { tabId: "pills-cute", cardContainerId: "cardContainer-march", paginationId: "paginationControls-march", cardsPerPage: 9 },
      { tabId: "pills-fish", cardContainerId: "cardContainer-fish", paginationId: "paginationControls-fish", cardsPerPage: 9 }
      // Add more tabs here as needed
    ];

    function initPagination({ cardContainerId, paginationId, cardsPerPage }) {
      const container = document.getElementById(cardContainerId);
      const pagination = document.getElementById(paginationId);
      const cards = Array.from(container.children);
      const totalPages = Math.ceil(cards.length / cardsPerPage);
      let currentPage = 1;

      function showPage(page) {
        currentPage = page;
        const start = (page - 1) * cardsPerPage;
        const end = page * cardsPerPage;

        cards.forEach((card, index) => {
          card.style.display = index >= start && index < end ? "block" : "none";
        });

        renderPagination();
      }

      function renderPagination() {
        pagination.innerHTML = "";

        const addPageItem = (label, page, isActive = false, isDisabled = false) => {
          const li = document.createElement("li");
          li.className = `page-item ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`;
          const btn = document.createElement("button");
          btn.className = "page-link gold-pagination";
          btn.textContent = label;
          btn.disabled = isDisabled;
          btn.addEventListener("click", () => {
            if (!isDisabled && page !== currentPage) {
              showPage(page);
            }
          });
          li.appendChild(btn);
          pagination.appendChild(li);
        };

        // Prev
        addPageItem("<", currentPage - 1, false, currentPage === 1);

        const visiblePages = [];

        if (totalPages <= 6) {
          for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
        } else {
          visiblePages.push(1);
          if (currentPage > 3) visiblePages.push("...");
          const start = Math.max(2, currentPage - 1);
          const end = Math.min(totalPages - 1, currentPage + 1);
          for (let i = start; i <= end; i++) visiblePages.push(i);
          if (currentPage < totalPages - 2) visiblePages.push("...");
          visiblePages.push(totalPages);
        }

        visiblePages.forEach(p => {
          if (p === "...") {
            const li = document.createElement("li");
            li.className = "page-item disabled";
            li.innerHTML = `<span class="page-link text-dark bg-light border-0">…</span>`;
            pagination.appendChild(li);
          } else {
            addPageItem(p, p, p === currentPage);
          }
        });

        // Next
        addPageItem(">", currentPage + 1, false, currentPage === totalPages);
      }

      showPage(1); // Initialize
    }

    // Attach pagination on tab shown
    document.querySelectorAll('button[data-bs-toggle="pill"]').forEach(btn => {
      btn.addEventListener("shown.bs.tab", (e) => {
        const tabId = e.target.getAttribute("data-bs-target").substring(1); // Remove #
        const tabConfig = paginatedTabs.find(tab => tab.tabId === tabId);
        if (tabConfig) initPagination(tabConfig);
      });
    });

    // Init default tab
    initPagination(paginatedTabs[0]);
  });
