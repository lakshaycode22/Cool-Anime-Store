import React, { Fragment, useEffect } from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      headerClassName: "bg-secondary-variant-2 text-primary flex-1",
      headerAlign: "center",
      flex: 1,
      minWidth: 300,
    },

    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-secondary-variant-2 text-primary",
      headerAlign: "center",
      flex: 0.5,
      minWidth: 150,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "text-green"
          : "text-red";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      headerClassName: "bg-secondary-variant-2 text-primary",
      headerAlign: "center",
      type: "number",
      flex: 0.3,
      minWidth: 150,
    },

    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "bg-secondary-variant-2 text-primary",
      headerAlign: "center",
      type: "number",
      flex: 0.5,
      minWidth: 270,
    },

    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "bg-secondary-variant-2 text-primary",
      headerAlign: "center",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="h-screen">
            <div className="md:m-16 m-8">
              <div className="">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  autoHeight
                />

                <p className="mt-8 text-2xl">{user.name}'s Orders</p>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default MyOrders;
