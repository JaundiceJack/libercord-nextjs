import { FC, useState } from "react";
import Modal from "../../elements/containers/modal";
import EditableScrollWindow from "../../elements/containers/EditableScrollWindow";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import { capitalize } from "../../../helpers/strings";
import CatalogHeader from "./CatalogHeader";
import OptionSection from "./OptionSection";
import OptionField from "./OptionField";
import OptionEntry from "./interface/OptionEntry";
import Spinner from "../../elements/misc/spinner";
import {
  addItemToCatalog,
  editCatalogItem,
  deleteCatalogItem,
  selectCatalog,
} from "../../../redux/catalogSlice";
import TextEntry from "../../elements/input/form/textEntry";
import BasicButton from "../../elements/input/button/basicButton";
import useErrMsgs from "../../../hooks/useErrMsgs";
import ErrorMessages from "../../elements/misc/errorMessages";
import { IoMdArrowDropdown } from "react-icons/io";
import DeleteModal from "./interface/DeleteModal";
import EditModal from "./interface/EditModal";

export type SectionOption = "income" | "expense" | "asset" | "debt";
export type FieldOption = "source" | "category" | "location";

const CatalogWindow: FC = () => {
  // Get the catalog from redux
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);
  // Set up component states (not worth putting in redux)
  const [newOption, setNewOption] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [editOption, setEditOption] = useState<string>("");
  const [selectedSection, setSelectedSection] =
    useState<SectionOption>("income");
  const [selectedField, setSelectedField] = useState<FieldOption>("source");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { errMsgs, setErrMsgs } = useErrMsgs();

  // Give the plural version of the field (since they are in the catalog but not the sections)
  const pluralizeField = (field: string) => {
    switch (field) {
      case "source":
        return "sources";
      case "category":
        return "categories";
      case "location":
        return "locations";
      default:
        return "sources";
    }
  };

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

  // Issue add, edit, and delete actions on button clicks
  const dispatch = useReduxDispatch();
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
    <div className="relative flex flex-col">
      <CatalogHeader />
      <div className="w-full h-px bg-gray-700" />
      <OptionSection
        selected={selectedSection}
        setSection={(section: SectionOption) => {
          setSelectedSection(section);
          section === "income"
            ? setSelectedField("source")
            : section === "expense"
            ? setSelectedField("location")
            : setSelectedField("category");
        }}
      />
      <div className="w-full h-px bg-yellow-500" />
      <div className="relative w-full flex items-center justify-center">
        <IoMdArrowDropdown
          size="25px"
          color="#fa0"
          style={{ marginTop: "5px" }}
          className="absolute"
        />
      </div>
      <OptionField
        section={selectedSection}
        selected={selectedField}
        setField={(field: FieldOption) => setSelectedField(field)}
      />
      <div className="w-full h-px bg-gray-700" />
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
    </div>
  );
};

export default CatalogWindow;
