# Tool call (/docs/components/tool-call)

The tools an agent calls, shown between its message and its answer. Each call takes a `server`,
a `name` and a `state` — `queued` waits, `running` spins, `done` shows how long it took and what
came back. Click a call to fold its `input` and `output` open or shut. The `reply` fades in once
every call is done.

<Preview>
  <ToolCallExample />
</Preview>

## Usage [#usage]

<Tabs items={['React', 'Angular', 'Flutter']}>

<Tab value="React">

```tsx
import { ToolCall, type ToolCallItem } from './tool-call/ToolCall';

const calls: ToolCallItem[] = [
  {
    key: 'billing',
    server: 'billing',
    name: 'list_plan_changes',
    icon: 'coins',
    state: 'done',
    duration: '412 ms',
    input: { since: '2026-10-01' },
    output: [{ plan: 'Pro', price: 24 }, { plan: 'Team', price: 48 }],
  },
];

<ToolCall
  message="Checking which plans changed this month."
  calls={calls}
  reply="Two plans changed. I updated their prices."
  defaultOpen={['billing']}
/>
```

</Tab>

<Tab value="Angular">

```html
<!-- imports: [ToolCallComponent] -->
calls: ToolCallItem[] = [{
  key: 'billing', server: 'billing', name: 'list_plan_changes', icon: 'coins',
  state: 'done', duration: '412 ms',
  input: { since: '2026-10-01' },
  output: [{ plan: 'Pro', price: 24 }, { plan: 'Team', price: 48 }],
}];

<ToolCall
  message="Checking which plans changed this month."
  [calls]="calls"
  reply="Two plans changed. I updated their prices."
  [defaultOpen]="['billing']"
/>
```

</Tab>

<Tab value="Flutter">

```dart
import 'components/tool_call.dart';

const calls = [
  ToolCallItem(
    key: 'billing', server: 'billing', name: 'list_plan_changes',
    icon: Icons.monetization_on_outlined,
    state: ToolCallState.done, duration: '412 ms',
    input: {'since': '2026-10-01'}, hasInput: true,
    output: [{'plan': 'Pro', 'price': 24}, {'plan': 'Team', 'price': 48}], hasOutput: true,
  ),
];

ToolCall(
  message: 'Checking which plans changed this month.',
  calls: calls,
  reply: 'Two plans changed. I updated their prices.',
  defaultOpen: const ['billing'],
),
```

</Tab>

</Tabs>

## Properties [#properties]

| Name | Type | Description |
| --- | --- | --- |
| `message` | `ReactNode` | The agent's message before the calls. |
| `calls` | `ToolCallItem[]` | The tools the agent called, each a row that folds open. |
| `reply` | `ReactNode` | The agent's answer after the calls. It fades in once every call is done. |
| `open` | `string[]` | Keys of the calls that are open. Leave it out to let each call toggle itself. |
| `defaultOpen` | `string[]` | The calls open at first when `open` is uncontrolled. |
| `onOpenChange` | `(open: string[]) => void` | Called with the new open set whenever a call is toggled. |
| `call.server` | `string` | The tool's server or namespace, like `billing`. |
| `call.name` | `string` | The tool's name, like `list_plan_changes`. |
| `call.icon` | `IconName` | The icon in front of the call. |
| `call.state` | `queued \| running \| done` | `queued` waits, `running` spins, `done` shows the time and output. |
| `call.duration` | `string` | How long it took, like `412 ms`. Shown once done. |
| `call.input` | `Json` | What the agent sent, shown as highlighted JSON. |
| `call.output` | `Json` | What came back, shown once done. |
| `call.outputContent` | `ReactNode` / `TemplateRef` / `Widget` | Rich output rendered inside the expanded Output panel. |

## Rich tool output and MCP Apps [#rich-tool-output-and-mcp-apps]

Use `outputContent` when a tool returns something interactive or visual instead of plain JSON: an
MCP App, HTML preview, chart, map, image, artifact, or native control. Visuno owns the disclosure,
layout, clipping, and lazy lifecycle. Rich output is mounted only while its tool panel is open, so a
canvas, iframe, or WebView measures a visible container.

Visuno deliberately does **not** implement the MCP transport. The host application remains
responsible for authentication, resource loading, sandbox/WebView policy, JSON-RPC messaging, tool
calls, approvals, and persistence. An MCP adapter turns that protocol state into the platform's rich
output type.

<Tabs items={['React', 'Angular', 'Flutter']}>

<Tab value="React">

```tsx
const call: ToolCallItem = {
  key: 'map-1',
  server: 'places',
  name: 'show_map',
  state: 'done',
  input: { location: 'London' },
  outputContent: (
    <McpAppView
      resourceUri="ui://maps/app.html"
      toolInput={{ location: 'London' }}
      toolResult={result}
    />
  ),
};

<ToolCall calls={[call]} defaultOpen={[call.key]} />
```

`McpAppView` is an application adapter, not part of `@visuno/react`. It may use a sandboxed iframe
and handle the MCP Apps JSON-RPC protocol.

</Tab>

<Tab value="Angular">

```html
<ng-template #mapOutput let-call>
  <app-mcp-view
    resourceUri="ui://maps/app.html"
    [toolInput]="call.input"
    [toolResult]="result"
  />
</ng-template>

<ToolCall
  [calls]="[{
    key: 'map-1', server: 'places', name: 'show_map', state: 'done',
    input: { location: 'London' }, outputContent: mapOutput
  }]"
  [defaultOpen]="['map-1']"
/>
```

The rich output is an Angular `TemplateRef`. The host component supplies the iframe or other native
Angular renderer and owns the protocol bridge.

</Tab>

<Tab value="Flutter">

```dart
ToolCall(
  calls: [
    ToolCallItem(
      key: 'map-1',
      server: 'places',
      name: 'show_map',
      state: ToolCallState.done,
      input: const {'location': 'London'},
      hasInput: true,
      outputContent: McpAppView(
        resourceUri: 'ui://maps/app.html',
        toolInput: const {'location': 'London'},
        toolResult: result,
      ),
    ),
  ],
  defaultOpen: const ['map-1'],
)
```

`McpAppView` can use a WebView or a fully native Flutter implementation. It belongs to the host or a
separate MCP adapter package; Visuno itself does not require a WebView dependency.

</Tab>

</Tabs>

### Adapter boundary [#adapter-boundary]

Keep protocol-specific code outside the component library:

| Visuno owns | The host or adapter owns |
| --- | --- |
| Expand/collapse behavior | MCP connection and authentication |
| Lazy mounting and sizing | Reading `ui://` resources |
| Output layout and clipping | `ui/initialize` and notifications |
| Loading/error presentation supplied by the renderer | Tool and resource JSON-RPC calls |
| Cross-platform visual parity | iframe/WebView permissions and navigation policy |

## Theming [#theming]

Works in light and dark (`data-theme="dark"`) and in the Soft style (`data-style="soft"`). The call
rows sit on the stage with a chip-tinted icon badge and chip-tinted JSON blocks; keys, strings and
numbers take their own palette tokens, and the running spinner and fold motion follow the shared
ease. In Soft the rows and JSON blocks are rounder.
