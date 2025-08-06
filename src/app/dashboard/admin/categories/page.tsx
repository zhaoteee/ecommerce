import { columns } from "@/app/dashboard/admin/categories/columns";
import CategoryDetail from "@/components/dashboard/forms/category-detail";
import DataTable from "@/components/ui/data-table";
import { getAllCategories } from "@/queries/category";
import { Plus } from "lucide-react";

const AdminCategoriesPage = async () => {
  const categories = await getAllCategories();

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15}></Plus>Create category
        </>
      }
      modalChildren={<CategoryDetail />}
      filterValue="name"
      data={categories}
      searchPlaceholder="Search category name"
      columns={columns}
    ></DataTable>
  );
};

export default AdminCategoriesPage;
