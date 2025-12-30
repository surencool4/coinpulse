import DataTable from "@/components/DataTable";
import React from "react";

export const CoinOverViewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton" />
        <div className="info">
          <div className="header-line-sm skeleton" />
          <div className="header-line-lg skeleton" />
        </div>
      </div>
      <div className="chart">
        <div className="chart-skeleton skeleton" />
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  const columns = [
    {
      header: "Name",
      cell: () => (
        <div className="nav-link">
          <div className="name-image skeleton" />
          <div className="name-line skeleton" />
        </div>
      ),
    },
    {
      header: "24h Change",
      cell: () => (
        <div className="nav-link">
          <div className="name-image skeleton" />
          <div className="name-line skeleton" />
        </div>
      ),
    },
    {
      header: "Price",
      cell: () => (
        <div className="nav-link">
          <div className="name-image skeleton" />
          <div className="name-line skeleton" />
        </div>
      ),
    },
  ];

  const skeletonData = Array.from({ length: 6 }, (_, index) => ({
    id: index,
  }));

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <DataTable
        data={skeletonData}
        columns={columns}
        rowKey={(row) => row.id}
        tableClassName="trend-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};
