import { Card, CardContent, Typography } from "@material-ui/core";
import CardSpacer from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import Hr from "@saleor/components/Hr";
import MultiAutocompleteSelectField, {
  MultiAutocompleteChoiceType
} from "@saleor/components/MultiAutocompleteSelectField";
import { ChangeEvent } from "@saleor/hooks/useForm";
import {
  WebhookEventTypeAsync,
  WebhookEventTypeSync
} from "@saleor/types/globalTypes";
import {
  mapAsyncEventsToChoices,
  mapSyncEventsToChoices
} from "@saleor/webhooks/utils";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import { messages } from "./messages";

interface WebhookEventsProps {
  data: {
    syncEvents: WebhookEventTypeSync[];
    asyncEvents: WebhookEventTypeAsync[];
  };
  syncEventsChoices: MultiAutocompleteChoiceType[];
  asyncEventsChoices: MultiAutocompleteChoiceType[];
  onSyncEventChange: (event: ChangeEvent) => void;
  onAsyncEventChange: (event: ChangeEvent) => void;
}

const WebhookEvents: React.FC<WebhookEventsProps> = ({
  data,
  syncEventsChoices,
  asyncEventsChoices,
  onSyncEventChange,
  onAsyncEventChange
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle title={intl.formatMessage(messages.events)} />
      <CardContent>
        <Typography variant="caption">
          <FormattedMessage {...messages.synchronousEvents} />
        </Typography>
        <CardSpacer />
        <Typography variant="body1">
          <FormattedMessage
            {...messages.assignPermissionsToSynchronousEvents}
          />
        </Typography>
        <CardSpacer />
        <MultiAutocompleteSelectField
          displayValues={mapSyncEventsToChoices(data.syncEvents)}
          label={intl.formatMessage(messages.registeredEvents)}
          choices={syncEventsChoices}
          name="syncEvents"
          value={data.syncEvents}
          onChange={onSyncEventChange}
          data-test="syncEvents"
          testId="syncEvent"
        />
        <CardSpacer />
        <Hr />
        <CardSpacer />
        <Typography variant="caption">
          <FormattedMessage {...messages.asynchronousEvents} />
        </Typography>
        <CardSpacer />
        <Typography variant="body1">
          <FormattedMessage
            {...messages.assignPermissionsToAsynchronousEvents}
          />
        </Typography>
        <CardSpacer />
        <MultiAutocompleteSelectField
          displayValues={mapAsyncEventsToChoices(
            data.asyncEvents,
            data.asyncEvents
          )}
          label={intl.formatMessage(messages.registeredEvents)}
          choices={asyncEventsChoices}
          name="asyncEvents"
          value={data.asyncEvents}
          onChange={onAsyncEventChange}
          data-test="asyncEvents"
          testId="asyncEvent"
        />
      </CardContent>
    </Card>
  );
};
WebhookEvents.displayName = "WebhookEvents";
export default WebhookEvents;
