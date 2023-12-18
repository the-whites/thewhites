namespace AspTest {
    public class MySpecialHeaderDelegatingHandler : DelegatingHandler
{
    private const string MySpecialHeader = "my-special-header";

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        EnsureMySpecialHeaderExists(request);
        return await base.SendAsync(request, cancellationToken).ConfigureAwait(false);
    }

    private static void EnsureMySpecialHeaderExists(HttpRequestMessage request)
    {

        request.Headers.Add("Cross-Origin-Opener-Policy", "same-origin");
    }
}
}