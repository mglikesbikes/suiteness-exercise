import { component$ } from "@builder.io/qwik";

type Props = {
  message?: string;
};

export default component$(({ message }: Props) => {
  return (
    <div class="border border-red-500 bg-red-50 p-4 shadow-lg">
      <h2 class="font-bold">Sorry, something went wrong.</h2>
      {message && <p>{message}</p>}
      {!message && (
        <p>
          <em class="text-slate-500">That's all we know.</em>
        </p>
      )}
    </div>
  );
});
