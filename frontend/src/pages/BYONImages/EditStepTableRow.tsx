import * as React from 'react';
import { Tr, Td } from '@patternfly/react-table';
import { Button, TextInput } from '@patternfly/react-core';
import { PencilAltIcon, TimesIcon, CheckIcon, MinusCircleIcon } from '@patternfly/react-icons';
import { BYONImagePackage } from '../../types';

interface EditStepTableRowProps {
  imagePackage: BYONImagePackage;
  setEditedValues: (values: BYONImagePackage) => void;
  onDeleteHandler: () => void;
}

export const EditStepTableRow: React.FunctionComponent<EditStepTableRowProps> = ({
  imagePackage,
  setEditedValues,
  onDeleteHandler,
}) => {
  const [modifiedValue, setModifiedValue] = React.useState<BYONImagePackage>(imagePackage);
  const [isEditMode, setIsEditMode] = React.useState(false);

  return (
    <Tr key={imagePackage.name}>
      <Td dataLabel={imagePackage.name}>
        {isEditMode ? (
          <TextInput
            id="software-package-input"
            type="text"
            value={modifiedValue.name}
            onChange={(value) => {
              setModifiedValue({
                name: value,
                version: modifiedValue.version,
                visible: modifiedValue.visible,
              });
            }}
          />
        ) : (
          imagePackage.name
        )}
      </Td>
      <Td dataLabel={imagePackage.version}>
        {isEditMode ? (
          <TextInput
            id="version-input"
            type="text"
            value={modifiedValue.version}
            onChange={(value) => {
              setModifiedValue({
                name: modifiedValue.name,
                version: value,
                visible: modifiedValue.visible,
              });
            }}
          />
        ) : (
          imagePackage.version
        )}
      </Td>
      <Td modifier="nowrap">
        {!isEditMode ? (
          <Button
            id="edit-package-software-button"
            variant="plain"
            icon={<PencilAltIcon />}
            iconPosition="right"
            onClick={() => {
              setModifiedValue(imagePackage);
              setIsEditMode(true);
            }}
          />
        ) : (
          <>
            <Button
              id="save-package-software-button"
              variant="plain"
              icon={<CheckIcon />}
              onClick={() => {
                setEditedValues(modifiedValue);
                setIsEditMode(false);
              }}
            />
            <Button
              id="cancel-package-software-modifications-button"
              variant="plain"
              icon={<TimesIcon />}
              onClick={() => {
                setEditedValues(imagePackage);
                setIsEditMode(false);
              }}
            />
          </>
        )}
        <Button
          id="delete-package-software-button"
          variant="plain"
          icon={<MinusCircleIcon />}
          onClick={() => {
            onDeleteHandler();
            setIsEditMode(false);
          }}
        />
      </Td>
    </Tr>
  );
};
