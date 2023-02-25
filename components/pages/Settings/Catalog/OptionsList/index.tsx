import { FC, useState } from "react";
import { capitalize, pluralizeField } from "../../../../../helpers/strings";
import useErrMsgs from "../../../../../hooks/useErrMsgs";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  addItemToCatalog,
  deleteCatalogItem,
  editCatalogItem,
  selectCatalog,
} from "../../../../../redux/catalog";
import EditableScrollWindow from "../../../../elements/containers/EditableScrollWindow";
import ErrorMessages from "../../../../elements/misc/errorMessages";
import Spinner from "../../../../elements/misc/spinner";
import DeleteModal from "../modals/DeleteOption";
import EditModal from "../modals/EditOption";
import { OptionsListProps } from "../types";
import OptionEntry from "./OptionEntry";

const OptionsList: FC<OptionsListProps> = ({
  selectedField,
  selectedSection,
}) => {
  const dispatch = useReduxDispatch();
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);
  const [newOption, setNewOption] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [editOption, setEditOption] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { errMsgs, setErrMsgs } = useErrMsgs();

  // Sort options alphabetically
  const sortFunction = (a: string, b: string) => {
    if (sortDirection === "asc") {
      return a < b ? 1 : a > b ? -1 : 0;
    } else return a < b ? -1 : a > b ? 1 : 0;
  };
  const sortedOptions = () => {
    const options =
      catalog?.[selectedSection]?.[pluralizeField(selectedField)] ?? [];
    let editCopy = [...options];
    return editCopy.sort(sortFunction);
  };

  const onAdd = () => {
    dispatch(
      addItemToCatalog({
        section: selectedSection,
        field: pluralizeField(selectedField),
        item: newOption,
      })
    );
    setNewOption("");
  };

  const onEdit = () => {
    editOption === "" && setErrMsgs([...errMsgs, "Value must not be empty."]);
    selectedOption !== editOption &&
      editOption !== "" &&
      dispatch(
        editCatalogItem({
          section: selectedSection,
          field: pluralizeField(selectedField),
          oldItem: selectedOption,
          newItem: editOption,
        })
      );
    setSelectedOption("");
    setEditOption("");
  };

  const onDelete = () => {
    dispatch(
      deleteCatalogItem({
        section: selectedSection,
        field: pluralizeField(selectedField),
        item: selectedOption,
      })
    );
    setSelectedOption("");
  };

  return (
    <>
      {errMsgs.length > 0 && (
        <div className="w-full bg-stone-200 p-3">
          <ErrorMessages errors={errMsgs} className="mb-2" />
        </div>
      )}
      <div className="w-full h-2 bg-gray-800" />
      {catalogLoading ? (
        <div className="h-full bg-neutral-400 rounded-b-lg">
          <Spinner color="black" />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <OptionEntry
            field={selectedField}
            newOption={newOption}
            setNewOption={(e) => setNewOption(e.currentTarget.value)}
            onAdd={() => onAdd()}
          />
          <div className="w-full h-2 bg-gray-800" />
          <div className="w-full h-px bg-gray-700" />
          <div
            id="catalogOptionList"
            className={`rounded-md flex w-full h-full items-center justify-center`}
          >
            <EditableScrollWindow
              column={{
                name: selectedField,
                label: capitalize(pluralizeField(selectedField)),
                setSort: () =>
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc"),
              }}
              sortDirection={sortDirection}
              items={sortedOptions()}
              editItem={(value: string) => {
                setSelectedOption(value);
                setEditOption(value);
                setEditModal(true);
              }}
              deleteItem={(value: string) => {
                setSelectedOption(value);
                setDeleteModal(true);
              }}
            />
          </div>
        </div>
      )}

      <EditModal
        section={selectedSection}
        field={selectedField}
        opened={editModal}
        toggle={() => setEditModal(!editModal)}
        value={editOption}
        onEdit={(e) => setEditOption(e.currentTarget.value)}
        onSubmit={() => {
          onEdit();
          setEditModal(!editModal);
        }}
      />
      <DeleteModal
        section={selectedSection}
        field={selectedField}
        option={selectedOption}
        opened={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        onDelete={() => {
          onDelete();
          setDeleteModal(!deleteModal);
        }}
      />
    </>
  );
};

export default OptionsList;
