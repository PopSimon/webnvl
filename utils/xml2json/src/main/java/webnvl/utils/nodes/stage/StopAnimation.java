package webnvl.utils.nodes.stage;

public class StopAnimation extends AnimationEvent {
	public StopAnimation() {}
	
	public StopAnimation(String id) {
		this.id = id;
	}
	
	public StopAnimation(String id, String delay) {
		this(id);
		this.delay = delay;
	}
}
