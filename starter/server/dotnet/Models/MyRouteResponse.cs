using Newtonsoft.Json;

public class MyRouteResponse
{
    [JsonProperty("options")]
    public MyRouteRequest Options { get; set; }
}
